import { useState } from "react";

export function useDeleteProduct({ onDeleteProduct }: { onDeleteProduct: (id: string) => Promise<string> }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [message, setMessage] = useState<string>()

  const onDelete = async (productId: string) => {
    setLoading(true)
    try {
      const message = await onDeleteProduct(productId)
      setMessage(message)
    } catch (e) {
      const error = e as Error
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    message,
    onDelete
  }
}