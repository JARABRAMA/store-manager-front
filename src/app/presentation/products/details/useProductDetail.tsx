import { useEffect, useState } from "react"
import type { FindByIdCommand } from "../../../application/products/FindByIdUseCase"
import { useCases } from "../../../di"
import type { Product } from "../../../domain/model/Product"
import { useParams } from "react-router"

export type UseProductDetail = {
  findById: ({ id }: FindByIdCommand) => Promise<Product>,
}

export function useProductDetail({ findById = useCases.findByIdUseCase }: UseProductDetail) {

  const { productId } = useParams()
  const [product, setProduct] = useState<Product>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    const findProduct = async () => {
      setLoading(true)
      try {
        if (productId) {
          const data = await findById({ id: productId })
          setProduct(data)
        } else {
          setError("Url invalida")
        }
      } catch (e) {
        const error = e as Error
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    findProduct()
  }, [findById, productId])


  return {
    product, loading, error
  }

}
