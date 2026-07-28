import { UpdateProductException } from "../../domain/exceptions/UpdateProductException";
import type { Product } from "../../domain/model/Product";
import type { ProductRepositoryPort } from "../../domain/ProductRepositoryPort";
import { ValidateProductUseCase } from "./ValidateProductUseCase";

export function UpdateProductUseCase({
  repository,
}: {
  repository: ProductRepositoryPort;
}) {
  return async (productId: string, product: Product): Promise<string> => {
    if (!productId || !product.id)
      throw new UpdateProductException("La id del producto no puede ser nula");
    ValidateProductUseCase({ product });
    return await repository.update(productId, product);
  };
}
