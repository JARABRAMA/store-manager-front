import type { Product } from "../../domain/model/Product";
import type { ProductResponse } from "../dto/ProductResponse";

export class ProductResponseMapper {
  static toDomain(product: ProductResponse): Product {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      categories: product.categories,
      description: product.description,
      imageUrl: product.imageUrl,
    };
  }
}
