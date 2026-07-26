import { describe, vi, it, expect } from "vitest";
import { useProductDetail } from "../../../../app/presentation/shared/hooks/useProductDetail";
import { ProductDetailScreen } from "../../../../app/presentation/products/details/ProductDetailScreen";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";

vi.mock(
  "../../../../app/presentation/shared/hooks/useProductDetail",
  () => ({ useProductDetail: vi.fn() }),
);

const mockedUseProductDetail = vi.mocked(useProductDetail);

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

describe("Product Detail Screen document", () => {
  describe("product detail screen component", () => {
    it("Shows loading spinner while loading", () => {
      mockedUseProductDetail.mockReturnValue({
        loading: true,
        error: undefined,
        product: undefined,
      });

      render(<ProductDetailScreen />, {
        wrapper: (porps) =>
          wrapper({ ...porps, initialPath: "/products/1234" }),
      });
      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    });

    it("shows error message when error is not undefined", () => {
      mockedUseProductDetail.mockReturnValue({
        loading: false,
        error: "Error del servidor",
        product: undefined,
      });

      render(<ProductDetailScreen />, {
        wrapper: (porps) =>
          wrapper({ ...porps, initialPath: "/products/1234" }),
      });
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
      expect(screen.getByText("Error del servidor")).toBeInTheDocument();
    });
  });
});
