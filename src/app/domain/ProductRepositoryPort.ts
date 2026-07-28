import type { Page } from "./model/Page";
import type { Product } from "./model/Product";

export interface ProductRepositoryPort {
  findAll(
    search: string | null,
    category: string | null,
    page: number | null,
  ): Promise<Page<Product>>;
  findById(id: string): Promise<Product>;
  findAllCategories(): Promise<string[]>;

  save(product: Product): Promise<string>;
  update(id: string, product: Product): Promise<string>;
  delete(id: string): Promise<string>
}
