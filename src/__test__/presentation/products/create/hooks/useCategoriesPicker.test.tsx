import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { useCategoriesPicker } from "../../../../../app/presentation/products/create/hooks/useCategoriesPicker";
import { act } from "react";

describe('categories picker hook', () => {
  let findAllCategoriesUseCase: Mock<() => Promise<string[]>>

  beforeEach(() => {
    findAllCategoriesUseCase = vi.fn()
  })

  it('default values of categories picker when success use case', async () => {
    const expectedCategories = ['category 1', 'category 2', 'category 3']
    findAllCategoriesUseCase.mockResolvedValue(expectedCategories)
    const { result } = renderHook(() => useCategoriesPicker(findAllCategoriesUseCase))

    await waitFor(() => expect(result.current.categoriesLoading).toBe(false))

    expect(result.current.categories).toEqual(expectedCategories)
    expect(result.current.selectedCategories).toEqual([])
    expect(result.current.categoriesError).toBeUndefined()
    expect(result.current.categoriesLoading).toBe(false)
  })

  it('adding existents categories to selected categories', async () => {
    const expectedCategories = ['category 1', 'category 2', 'category 3']
    findAllCategoriesUseCase.mockResolvedValue(expectedCategories)
    const { result } = renderHook(() => useCategoriesPicker(findAllCategoriesUseCase))

    await waitFor(() => expect(result.current.categoriesLoading).toBe(false))

    act(() => {
      result.current.onSelectCategory('category 1')
      result.current.onSelectCategory('category 3')
    })

    expect(result.current.categories).toEqual(expectedCategories)
    expect(result.current.selectedCategories).toEqual(['category 1', 'category 3'])
    expect(result.current.categoriesError).toBeUndefined()
    expect(result.current.categoriesLoading).toBe(false)
  })

  it('adding non existents categories to selected categories', async () => {
    const expectedCategories = ['category 1', 'category 2', 'category 3']
    findAllCategoriesUseCase.mockResolvedValue(expectedCategories)
    const { result } = renderHook(() => useCategoriesPicker(findAllCategoriesUseCase))

    await waitFor(() => expect(result.current.categoriesLoading).toBe(false))

    act(() => {
      result.current.onSelectCategory('not existent')
      result.current.onSelectCategory('category 3')
    })

    expect(result.current.categories).toEqual(expectedCategories)
    expect(result.current.selectedCategories).toEqual(['not existent', 'category 3'])
    expect(result.current.categoriesError).toBeUndefined()
    expect(result.current.categoriesLoading).toBe(false)
  })

  it('removing categories from selected categories', async () => {
    const expectedCategories = ['category 1', 'category 2', 'category 3']
    findAllCategoriesUseCase.mockResolvedValue(expectedCategories)
    const { result } = renderHook(() => useCategoriesPicker(findAllCategoriesUseCase))

    await waitFor(() => expect(result.current.categoriesLoading).toBe(false))

    act(() => {
      result.current.onSelectCategory('category 1')
      result.current.onSelectCategory('category 3')
    })

    act(() => {
      result.current.onRemoveCategory('category 1')
    })

    expect(result.current.categories).toEqual(expectedCategories)
    expect(result.current.selectedCategories).toEqual(['category 3'])
    expect(result.current.categoriesError).toBeUndefined()
    expect(result.current.categoriesLoading).toBe(false)
  })

  it('default values of categories picker when error use case', async () => {
    const errorMessage = 'unexpected error'
    findAllCategoriesUseCase.mockRejectedValue(new Error(errorMessage))
    const { result } = renderHook(() => useCategoriesPicker(findAllCategoriesUseCase))

    await waitFor(() => expect(result.current.categoriesLoading).toBe(false))

    expect(result.current.categories).toEqual([])
    expect(result.current.selectedCategories).toEqual([])
    expect(result.current.categoriesError).toBe(errorMessage)
    expect(result.current.categoriesLoading).toBe(false)
  })

})