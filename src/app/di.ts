import { DeleteProductUseCase } from "./application/products/DeleteProductUseCase";
import { FilterProductsUseCase } from "./application/products/FilterProductsUseCase";
import { FindAllCategoriesUseCase } from "./application/products/FindAllCategoriesUseCase";
import { FindByIdUseCase } from "./application/products/FindByIdUseCase";
import { SaveProductUseCase } from "./application/products/SaveProductUseCase";
import { UpdateProductUseCase } from "./application/products/UpdateProductUseCase";
import type { ProductRepositoryPort } from "./domain/ProductRepositoryPort";
import { RemoteProductRepository } from "./infraestructure/RemoteProductRepository";

const serviceUrl = import.meta.env.VITE_SERVICE_URL;

const productRepository: ProductRepositoryPort = new RemoteProductRepository(
  serviceUrl,
  window.fetch.bind(window),
);

export const useCases = {
  filterProductsUseCase: FilterProductsUseCase(productRepository),
  findAllCategoriesUseCase: FindAllCategoriesUseCase(productRepository),
  findByIdUseCase: FindByIdUseCase(productRepository),
  deleteProductUseCase: DeleteProductUseCase({ repository: productRepository }),
  saveProductUseCase: SaveProductUseCase({ repository: productRepository }),
  updateProductUseCase: UpdateProductUseCase({ repository: productRepository }),
};
