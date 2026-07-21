import type { Product } from "../../domain/model/Product";
import type { ProductRepositoryPort } from "../../domain/ProductRepositoryPort";

export type SaveProductUseCaseCommand = {
  repository: ProductRepositoryPort
}

export function SaveProductUseCase({ repository}: SaveProductUseCaseCommand): (product: Product) => Promise<string> {
  return async (product: Product) => {
    return repository.save(product)
  }
}