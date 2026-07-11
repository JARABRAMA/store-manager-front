import { renderHook, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import type { FindByIdCommand } from "../../../../app/application/products/FindByIdUseCase";
import { ServerErrorException } from "../../../../app/domain/exceptions/ServerErrorException";
import type { Product } from "../../../../app/domain/model/Product";
import { useProductDetail } from "../../../../app/presentation/products/details/useProductDetail";

function wrapper({
  children,
  initialPath = "/products/123",
}: {
  children: React.ReactNode;
  initialPath?: string;
}) {
  return (
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/products/:productId?" element={children} />
      </Routes>
    </MemoryRouter>
  );
}

describe("use product details hook", () => {
  let findByIdMock: Mock<({ id }: FindByIdCommand) => Promise<Product>>;

  beforeEach(() => {
    findByIdMock = vi.fn();
  });

  it("should set invalid url error when productId url param is undefined", async () => {
    const { result } = renderHook(
      () => useProductDetail({ findById: findByIdMock }),
      {
        wrapper: (props) => wrapper({ ...props, initialPath: "/products/" }),
      },
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Url invalida");
    expect(result.current.product).toBeUndefined();
    expect(findByIdMock).not.toHaveBeenCalled();
  });

  it("should not set error when find by id throws exception", async () => {
    findByIdMock.mockRejectedValue(new ServerErrorException("service error"));

    const { result } = renderHook(
      () => useProductDetail({ findById: findByIdMock }),
      {
        wrapper: (props) => wrapper({ ...props, initialPath: "/products/123" }),
      },
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.product).toBeUndefined();
    expect(result.current.error).toBe("service error");
    expect(findByIdMock).toHaveBeenCalledWith({ id: "123" });
  });

  it("should return product when use case success", async () => {
    const product: Product = {
      name: "Product",
      stock: 2,
      price: 1200,
      id: "123",
      categories: null,
      imageUrl: null,
      description: null,
    };

    findByIdMock.mockResolvedValue(product);

    const { result } = renderHook(
      () => useProductDetail({ findById: findByIdMock }),
      {
        wrapper: (props) => wrapper({ ...props, initialPath: "/products/123" }),
      },
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.product).toEqual(product);
    expect(result.current.error).toBeUndefined();
    expect(findByIdMock).toHaveBeenCalledWith({ id: "123" });
  });
});
