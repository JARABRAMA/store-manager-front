import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import type { ProductRepositoryPort } from "../../../app/domain/ProductRepositoryPort";
import type { Product } from "../../../app/domain/model/Product";
import { SaveProductUseCase } from "../../../app/application/products/SaveProductUseCase";
import { ZodError } from "zod";

describe("Save product use case", () => {
  let repository: ProductRepositoryPort;
  let saveMock: Mock<(product: Product) => Promise<string>>;

  const testProduct: Product = {
    categories: null,
    description: "a short description with more than five words",
    id: null,
    imageUrl: null,
    name: "some name",
    price: 12300,
    stock: 32,
  };

  beforeEach(() => {
    saveMock = vi.fn();
    repository = {
      save: saveMock,
    } as unknown as ProductRepositoryPort;
  });

  it("if repository response with error, propagate the error", async () => {
    const message = "server  internal error";
    saveMock.mockRejectedValue(new Error(message));

    const useCase = SaveProductUseCase({ repository });

    try {
      await useCase(testProduct);
      expect.fail();
    } catch (e) {
      expect((e as Error).message).toBe(message);
    }
  });

  it("if repository success with message return message", async () => {
    const message = "product saved";
    saveMock.mockResolvedValue(message);

    const useCase = SaveProductUseCase({ repository });
    const actual = await useCase(testProduct);

    expect(actual).toBe(message);
  });

  it("if invalid product it should throws zod error", async () => {
    const invalidProduct: Product = {
      ...testProduct,
      id: "invalid uuid",
    };

    const useCase = SaveProductUseCase({ repository });
    try {
      await useCase(invalidProduct);
      expect(repository.save).not.toHaveBeenCalled();
      expect.fail();
    } catch (e) {
      expect(e).toBeInstanceOf(ZodError); // the all possibilities of data validation are in the ValidateProductUseCase.test.ts file
    }
  });
});
