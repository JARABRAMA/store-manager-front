import { FilterProductsUseCase } from "./application/products/FilterProductsUseCase";
import { FindAllCategoriesUseCase } from "./application/products/FindAllCategoriesUseCase";
import type { ProductRepositoryPort } from "./domain/ProductRepositoryPort";
import { RemoteProductRepository } from "./infraestructure/RemoteProductRepository";

const productRepository: ProductRepositoryPort = new RemoteProductRepository();

export const filterProductsUseCase = FilterProductsUseCase(productRepository);
export const findAllCategoriesUseCase =
  FindAllCategoriesUseCase(productRepository);
