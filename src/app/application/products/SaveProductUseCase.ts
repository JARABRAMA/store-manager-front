import type { Product } from "../../domain/model/Product";
import type { ProductRepositoryPort } from "../../domain/ProductRepositoryPort";
import { ValidateProductUseCase } from "./ValidateProductUseCase";

export type SaveProductUseCaseCommand = {
  repository: ProductRepositoryPort;
};

export function SaveProductUseCase({
  repository,
}: SaveProductUseCaseCommand): (product: Product) => Promise<string> {
  return async (product: Product) => {
    const validatedProduct = ValidateProductUseCase({ product });
    return repository.save(validatedProduct);
  };
}
