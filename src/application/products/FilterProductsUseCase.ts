import type { Page } from "../../domain/model/Page";
import type { Product } from "../../domain/model/Product";
import type { ProductRepositoryPort } from "../../domain/ProductRepositoryPort";

export type FilterProductsCommnad = {
  search: string | null;
  category: string | null;
  page: number | null;
};

export function FilterProductsUseCase(
  repository: ProductRepositoryPort,
): (params: FilterProductsCommnad) => Promise<Page<Product>> {
  return async (params: FilterProductsCommnad): Promise<Page<Product>> => {
    const { search, category, page } = params;
    return repository.findAll(search, category, page);
  };
}
