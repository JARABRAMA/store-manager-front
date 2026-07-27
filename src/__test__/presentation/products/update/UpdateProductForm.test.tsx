import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useProductDetail } from "../../../../app/presentation/shared/hooks/useProductDetail.tsx";
import { UpdateProductForm } from "../../../../app/presentation/products/update/UpdateProductForm.tsx";
import type { Product } from "../../../../app/domain/model/Product.ts";
import { useCases } from "../../../../app/di.ts";

vi.mock(
  "../../../../app/presentation/shared/hooks/useProductDetail.tsx",
  () => ({ useProductDetail: vi.fn() }),
);

vi.mock('../../../../app/di.ts',
  () => ({
    useCases: {
      updateProductUseCase: vi.fn()
    }
  })
)

describe("Update product form component", () => {
  const product: Product = {
    categories: ["sauce", "food"],
    description: "a short description with more than five words",
    id: "123e4567-e89b-4d3a-a456-426614174000",
    imageUrl: "http://image/url.png",
    name: "some name",
    price: 12300,
    stock: 32,
  };

  it("should appear loading spinner when loading state", () => {
    vi.mocked(useProductDetail).mockReturnValue({
      error: undefined,
      loading: true,
      product: undefined,
    });

    render(<UpdateProductForm />);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("should appear error message if error", () => {
    const message = "server internal error";
    vi.mocked(useProductDetail).mockReturnValue({
      error: message,
      loading: false,
      product: undefined,
    });

    render(<UpdateProductForm />);
    expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("should appear error message if error, even over loading state", () => {
    const message = "server internal error";
    vi.mocked(useProductDetail).mockReturnValue({
      error: message,
      loading: true,
      product: undefined,
    });

    render(<UpdateProductForm />);
    expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("if product should set default values in the form", () => {


    vi.mocked(useProductDetail).mockReturnValue({
      loading: false,
      error: undefined,
      product: product,
    });

    render(<UpdateProductForm />);

    expect(screen.getByTestId("input-name")).toHaveValue(product.name);
    expect(screen.getByTestId("input-description")).toHaveValue(
      product.description,
    );
    expect(screen.getByTestId("input-imageUrl")).toHaveValue(product.imageUrl);
    expect(screen.getByTestId("input-price")).toHaveValue(`${product.price}`);
    expect(screen.getByTestId("input-stock")).toHaveValue(`${product.stock}`);
    product.categories?.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument(); // categories into the categories heap
    });
  });


  it('if update success should show success message', async () => {
    const message = 'product updated'
    vi.mocked(useCases.updateProductUseCase).mockResolvedValue(message)



  })
});
