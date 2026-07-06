import type { ProductRepositoryPort } from "../../domain/ProductRepositoryPort";

export function FindAllCategoriesUseCase(
  repository: ProductRepositoryPort,
): () => Promise<string[]> {
  return () => {
    return repository.findAllCategories();
  };
}
