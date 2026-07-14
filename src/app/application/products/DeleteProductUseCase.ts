import type { ProductRepositoryPort } from "../../domain/ProductRepositoryPort";

export function DeleteProductUseCase({repository}: {repository: ProductRepositoryPort}): (id: string) => Promise<string> {
  return async (id: string) => {
    return repository.delete(id);
  }
}