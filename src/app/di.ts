import { FilterProductsUseCase } from "./application/products/FilterProductsUseCase";
import { FindAllCategoriesUseCase } from "./application/products/FindAllCategoriesUseCase";
import type { ProductRepositoryPort } from "./domain/ProductRepositoryPort";
import { RemoteProductRepository } from "./infraestructure/RemoteProductRepository";

const serviceUrl = import.meta.env.VITE_SERVICE_URL;

const productRepository: ProductRepositoryPort = new RemoteProductRepository(
  serviceUrl,
  window.fetch.bind(window),
);

export const filterProductsUseCase = FilterProductsUseCase(productRepository);
export const findAllCategoriesUseCase =
  FindAllCategoriesUseCase(productRepository);
