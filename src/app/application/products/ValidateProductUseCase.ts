import type { Product } from "../../domain/model/Product"
import { productSchema } from "../../domain/schmeas/productSchema"

export type  ValidateProductUseCaseCommand = {
  product: Product
}

export function ValidateProductUseCase({product}: ValidateProductUseCaseCommand): Product {
  return productSchema.parse(product) as Product
}