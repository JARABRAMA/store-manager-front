import { describe, expect, vi, it, type Mock, beforeEach } from "vitest";
import type { ProductRepositoryPort } from "../../../app/domain/ProductRepositoryPort";
import type { RemoteProductRepository } from "../../../app/infraestructure/RemoteProductRepository";

describe("Delete product use case", () => {
  let repository: ProductRepositoryPort;
  let deleteFn: Mock<(id: string) => Promise<string>>;

  beforeEach(() => {
    deleteFn = vi.fn();
    repository = {
      delete: deleteFn,
    } as unknown as RemoteProductRepository;
  });

  it("should propagate error when error", async () => {
    deleteFn.mockRejectedValue(new Error("any error"));

    try {
      await repository.delete("any");
      expect.fail();
    } catch (e) {
      expect((e as Error).message).toBe("any error");
    }
  });

  it("should return message when success", async () => {
    const message = "success";
    deleteFn.mockResolvedValue(message);

    const actual = await repository.delete("any");

    expect(actual).toBe(message);
  });
});
