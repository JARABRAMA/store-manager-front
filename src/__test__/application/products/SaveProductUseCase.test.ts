import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import type { ProductRepositoryPort } from "../../../app/domain/ProductRepositoryPort";
import type { Product } from "../../../app/domain/model/Product";
import { SaveProductUseCase } from "../../../app/application/products/SaveProductUseCase";

describe("Save product use case", () => {
  let repository: ProductRepositoryPort;
  let saveMock: Mock<(product: Product) => Promise<string>>;

  const testProduct: Product = {
    categories: null,
    description: "some description",
    id: "some id",
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
});
