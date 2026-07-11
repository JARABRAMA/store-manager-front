import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import type { ProductRepositoryPort } from "../../../app/domain/ProductRepositoryPort";
import { BadRequestException } from "../../../app/domain/exceptions/BadRequestException";
import { FindByIdUseCase } from "../../../app/application/products/FindByIdUseCase";
import type { Product } from "../../../app/domain/model/Product";


describe("FindByIdUseCase", () => {
  let repository: ProductRepositoryPort;
  let findByIdMock: Mock<(id: string) => Promise<Product>>

  beforeEach(() => {
     findByIdMock = vi.fn()
    repository = {
      findById: findByIdMock,
    } as unknown as ProductRepositoryPort
  })

  it("should throw exception when repository throws exception", async () => {
    findByIdMock.mockRejectedValue(new BadRequestException('bad request'))
    const useCase = FindByIdUseCase(repository)
    try {
      await useCase({ "id": "123412" });
      expect.fail()
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException)
      expect((e as Error).message).toBe('bad request')
    }
  })

  it('should returns product when product is returned by repository', async () => {
    const expected: Product = {
      name: 'Product',
      stock: 1,
      price: 1200,
      id: "aksfd12341l",
      categories: null,
      imageUrl: null,
      description: "some description"
    }

    findByIdMock.mockResolvedValue(expected)
    const useCase = FindByIdUseCase(repository)

    const actual = await useCase({ id: "aksfd12341l" })
    expect(actual).toEqual(expected)
  });
})
