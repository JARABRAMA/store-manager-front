import { describe, expect, it } from "vitest";
import { ValidateProductUseCase } from "../../../app/application/products/ValidateProductUseCase";
import { ZodError } from "zod";
import type { Product } from "../../../app/domain/model/Product";
import { randomUUID } from "node:crypto";
import path from "node:path";

describe("validate product use case", () => {
  const successProduct: Product = {
    id: randomUUID(),
    name: "Product 1",
    description: "a short description of the product",
    price: 1200,
    stock: 3000,
    imageUrl: "http://image.url.com.png",
    categories: ["category 1", "category 2"],
  };

  it("product with no name", () => {
    const product = { ...successProduct, name: null } as unknown as Product;
    try {
      ValidateProductUseCase({ product });
      expect.fail();
    } catch (e) {
      expect(e).toBeInstanceOf(ZodError);
      const error = e as ZodError;
      expect(error.issues.length).toBe(1);

      expect(error.issues[0]).toMatchObject({
        path: ["name"],
        message: "El nombre del producto no puede estar vacio",
      });
    }
  });

  it("product with name shorter than 3 characters", () => {
    const product = { ...successProduct, name: "pr" };

    try {
      ValidateProductUseCase({ product });
      expect.fail();
    } catch (e) {
      expect(e).toBeInstanceOf(ZodError);
      const error = e as ZodError;
      expect(error.issues.length).toBe(1);
      expect(error.issues[0]).toMatchObject({
        path: ["name"],
        message: "El nombre del producto debe tener al menos 3 caracteres",
      });
    }
  });

  it("product with name longer than 50 characters", () => {
    const product = {
      ...successProduct,
      name: "To assert that an object contains a specific subset of properties in Vitest, use expect(object).stringContaining() for partial string matches, or more commonly expect(object).toEqual(expect.objectContaining({...})) for objects.",
    };

    try {
      ValidateProductUseCase({ product });
      expect.fail();
    } catch (e) {
      expect(e).toBeInstanceOf(ZodError);
      const error = e as ZodError;
      expect(error.issues.length).toBe(1);
      expect(error.issues[0]).toMatchObject({
        path: ["name"],
        message: "El nombre del producto debe tener 50 caracteres o menos",
      });
    }
  });

  it("product with no price and stock", () => {
    const product = {
      ...successProduct,
      price: null,
      stock: null,
    } as unknown as Product;

    try {
      ValidateProductUseCase({ product });
    } catch (e) {
      expect(e).toBeInstanceOf(ZodError);
      const error = e as ZodError;
      expect(error.issues.length).toBe(2);
      expect(error.issues).toMatchObject([
        {
          path: ["stock"],
          message: "Las unidades disponibles del producto deben ser un número",
        },
        {
          path: ["price"],
          message: "El precio del producto debe ser un número",
        },
      ]);
    }
  });

  it("product with stock lower than 0", () => {
    const product = { ...successProduct, stock: -123 };

    try {
      ValidateProductUseCase({ product });
    } catch (e) {
      expect(e).toBeInstanceOf(ZodError);
      const error = e as ZodError;
      expect(error.issues.length).toBe(1);
      expect(error.issues[0]).toMatchObject({
        path: ["stock"],
        message:
          "Las unidades disponibles del producto deben ser cero o mayores que cero",
      });
    }
  });

  it("product with price lower than 100", () => {
    const product = { ...successProduct, price: 50 };
    try {
      ValidateProductUseCase({ product });
      expect.fail();
    } catch (e) {
      expect(e).toBeInstanceOf(ZodError);
      const error = e as ZodError;
      expect(error.issues.length).toBe(1);
      expect(error.issues[0]).toMatchObject({
        path: ["price"],
        message: "El precio del producto debe ser mayor o igual a 100 pesos",
      });
    }
  });

  it("product with no description", () => {
    const product = { ...successProduct, description: null };
    ValidateProductUseCase({ product }); // should not fail
  });

  it("product with empty description should be converted to null", () => {
    const product = { ...successProduct, description: "" };
    const actual = ValidateProductUseCase({ product });
    expect(actual.description).toBeNull();
  });

  it("product with undefined description should be converted to null", () => {
    const product = {
      ...successProduct,
      description: undefined,
    } as unknown as Product;
    const actual = ValidateProductUseCase({ product });
    expect(actual.description).toBeNull();
  });

  it("product with description with less tan 5 words", () => {
    const product = { ...successProduct, description: "less than 5 words" };
    try {
      ValidateProductUseCase({ product });
    } catch (e) {
      expect(e).toBeInstanceOf(ZodError);
      const error = e as ZodError;
      expect(error.issues.length).toBe(1);
      expect(error.issues[0]).toMatchObject({
        path: ["description"],
        message:
          "La descripción del producto debe contener al menos 5 palabras",
      });
    }
  });

  it("product with null image url", () => {
    const product = { ...successProduct, imageUrl: null };
    ValidateProductUseCase({ product }); //should not fail
  });

  it("product with undefined image url should converts it to null", () => {
    const product = {
      ...successProduct,
      imageUrl: undefined,
    } as unknown as Product;
    const actual = ValidateProductUseCase({ product });
    expect(actual.imageUrl).toBeNull();
  });

  it("product with void image url should converts it to null", () => {
    const product = {
      ...successProduct,
      imageUrl: "",
    } as unknown as Product;
    const actual = ValidateProductUseCase({ product });
    expect(actual.imageUrl).toBeNull();
  });

  it("product with invalid image url", () => {
    const product = {
      ...successProduct,
      imageUrl: "invalid url image",
    } as unknown as Product;

    try {
      ValidateProductUseCase({ product });
      expect.fail();
    } catch (e) {
      expect(e).toBeInstanceOf(ZodError);
      const error = e as ZodError;
      expect(error.issues.length).toBe(1);
      expect(error.issues[0]).toMatchObject({
        path: ["imageUrl"],
        message: "La URL de la imagen no tiene un formato válido",
      });
    }
  });

  it("product with void categories should be removed", () => {
    const product = {
      ...successProduct,
      categories: ["category 1", "", "category 3"],
    };

    const actual = ValidateProductUseCase({ product });

    expect(actual.categories).toEqual(["category 1", "category 3"]);
  });

  it("product id should have uuid format", () => {
    const product = { ...successProduct, id: "invalid id" };

    try {
      ValidateProductUseCase({ product });
      expect.fail();
    } catch (e) {
      expect(e).toBeInstanceOf(ZodError);
      const error = e as ZodError;
      expect(error.issues.length).toBe(1);
      expect(error.issues[0]).toMatchObject({
        path: ["id"],
        message: "El ID del producto tiene formato inválido",
      });
    }
  });

  it("product with no id should be accepted", () => {
    const product = { ...successProduct, id: null };

    ValidateProductUseCase({ product }); // should not happen anything
  });
});
