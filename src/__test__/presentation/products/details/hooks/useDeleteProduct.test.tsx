import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { useDeleteProduct } from "../../../../../app/presentation/products/details/hooks/useDeleteProduct";

describe("use delete product hook", () => {
  let deleteProductUseCase: Mock<(productId: string) => Promise<string>>;

  beforeEach(() => {
    deleteProductUseCase = vi.fn();
  });

  it("error, and message should be undefined, and loading should be false by default", () => {
    const { result } = renderHook(() =>
      useDeleteProduct({ onDeleteProduct: deleteProductUseCase }),
    );
    expect(result.current.error).toBeUndefined();
    expect(result.current.message).toBeUndefined();
    expect(result.current.loading).toBe(false);
  });

  it("should set error message when error", async () => {
    const errorMessage = "any error";
    deleteProductUseCase.mockRejectedValue(new Error(errorMessage));
    const { result } = renderHook(() =>
      useDeleteProduct({ onDeleteProduct: deleteProductUseCase }),
    );
    await act(async () => {
      await result.current.onDelete("any");
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.message).toBeUndefined();
    expect(result.current.error).toBe(errorMessage);
  });

  it("should set message when success", async () => {
    const message = "product deleted successfully";
    deleteProductUseCase.mockResolvedValue(message);

    const { result } = renderHook(() =>
      useDeleteProduct({ onDeleteProduct: deleteProductUseCase }),
    );

    await act(async () => {
      await result.current.onDelete('any')
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeUndefined();
    expect(result.current.message).toBe(message);
  });


  it('should reset values to default when reset after perform deleteAction', async () => {
    const message = "product deleted successfully";
    deleteProductUseCase.mockResolvedValue(message);

    const { result } = renderHook(() =>
      useDeleteProduct({ onDeleteProduct: deleteProductUseCase }),
    );

    await act(async () => {
      await result.current.onDelete('any')
    })

    act(() => {
      result.current.reset()
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.message).toBeUndefined()
    expect(result.current.error).toBeUndefined()
  })
});
