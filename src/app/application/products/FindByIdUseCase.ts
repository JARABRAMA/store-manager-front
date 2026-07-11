import type { Product } from "../../domain/model/Product"
import type { ProductRepositoryPort } from "../../domain/ProductRepositoryPort"

export type FindByIdCommand = {
  id: string
}

export function FindByIdUseCase(repository: ProductRepositoryPort): ({ id }: FindByIdCommand) => Promise<Product>{
  return async ({ id }: FindByIdCommand): Promise<Product> =>  {
    return await repository.findById(id)
  }
}
