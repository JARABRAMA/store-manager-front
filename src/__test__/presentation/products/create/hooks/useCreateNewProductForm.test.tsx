import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import type { Product } from "../../../../../app/domain/model/Product";
import { act, renderHook } from "@testing-library/react";
import { useCreateNewProductForm } from "../../../../../app/presentation/products/create/hooks/useCreateNewProductForm";

describe('use create new product form hook', () => {
  let onCreateProductUseCase: Mock<(product: Product) => Promise<string>>

  beforeEach(() => {
    onCreateProductUseCase = vi.fn()
  })

  it('forma values should be blank by default', () => {
    const { result } = renderHook(() => useCreateNewProductForm({ onCreateProduct: onCreateProductUseCase }))

    expect(result.current.formState.description).toBe("")
    expect(result.current.formState.imageUrl).toBe("")
    expect(result.current.formState.name).toBe("")
    expect(result.current.formState.price).toBe("")
    expect(result.current.formState.stock).toBe("")

  })

  it('form values should change when on update form state', () => {

    const { result } = renderHook(() => useCreateNewProductForm({ onCreateProduct: onCreateProductUseCase }))

    const expectedDescription = 'some description'
    const expectedName = 'Product 1'
    const expectedStock = '12'
    act(() => {
      result.current.onUpdateFormState('description', expectedDescription)
      result.current.onUpdateFormState('name', expectedName)
      result.current.onUpdateFormState('stock', expectedStock)
    })

    expect(result.current.formState.description).toBe(expectedDescription)
    expect(result.current.formState.imageUrl).toBe("")
    expect(result.current.formState.name).toBe(expectedName)
    expect(result.current.formState.price).toBe("")
    expect(result.current.formState.stock).toBe(expectedStock)

  })
})