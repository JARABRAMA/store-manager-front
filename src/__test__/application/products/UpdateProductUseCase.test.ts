import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import type { Product } from "../../../app/domain/model/Product";
import type { ProductRepositoryPort } from "../../../app/domain/ProductRepositoryPort";
import { UpdateProductUseCase } from "../../../app/application/products/UpdateProductUseCase";
import { BadRequestException } from "../../../app/domain/exceptions/BadRequestException";
import { ZodError } from "zod";
import { UpdateProductException } from "../../../app/domain/exceptions/UpdateProductException";

describe("Update product use case", () => {
  let updateProductMock: Mock<
    (productId: string, product: Product) => Promise<string>
  >;

  let repository: ProductRepositoryPort;
  let useCase: (productId: string, product: Product) => Promise<string>;

  beforeEach(() => {
    updateProductMock = vi.fn();
    repository = {
      update: updateProductMock,
    } as unknown as ProductRepositoryPort;
    useCase = UpdateProductUseCase({ repository });
  });

  const validProduct: Product = {
    id: "846cba72-c113-4285-ae19-5b1b3a0f20b7",
    name: "Main product",
    description: "a short description of the main product",
    price: 12400,
    stock: 12,
    imageUrl: "http://url.com.png",
    categories: null,
  };

  it("should propagate error if repository throws error", async () => {
    const message = "bad request";
    updateProductMock.mockRejectedValue(new BadRequestException(message));
    try {
      await useCase(validProduct.id!, validProduct);
      expect.fail();
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
      const error = e as BadRequestException;
      expect(error.message).toBe(message);
    }
  });

  it("should return message when repository success", async () => {
    const successMessage = "product updated";
    updateProductMock.mockResolvedValue(successMessage);

    const actual = await useCase(validProduct.id!, validProduct);
    expect(actual).toBe(successMessage);
  });

  it("should return update product exception when product with no id", async () => {
    const invalidProduct = { ...validProduct, id: null }
    try {
      await useCase(invalidProduct.id!, validProduct)
      expect.fail()
    } catch (e) {
      expect(e).toBeInstanceOf(UpdateProductException)
      const error = e as UpdateProductException
      expect(error.message).toBe('La id del producto no puede ser nula')
      expect(updateProductMock).not.toHaveBeenCalled()
    }
  });

  it("should return zod erro when invalid product", async () => {
    const invalidProduct = { ...validProduct, description: "invalid" };
    try {
      await useCase(invalidProduct.id!, invalidProduct);
      expect.fail();
    } catch (e) {
      expect(e).toBeInstanceOf(ZodError);
      expect(updateProductMock).not.toHaveBeenCalled();
    }
  });
});
