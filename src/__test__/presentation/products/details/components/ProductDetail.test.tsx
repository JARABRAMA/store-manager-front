import { describe, expect, it } from "vitest";
import type { Product } from "../../../../../app/domain/model/Product";
import { render, screen } from "@testing-library/react";
import { ProductDetails } from "../../../../../app/presentation/products/details/components/ProductDetails";

describe("Product Detail component testing", () => {
  it("should render all product details when complete product", () => {
    const completeProduct: Product = {
      name: "Cocacola",
      description: "Cocacola 1.5 litros, gaseosa negra",
      id: "1234",
      categories: ["Bebidas", "Gaseosas"],
      imageUrl: "http://cocacola.image.jpg",
      price: 6_200,
      stock: 7,
    };

    render(<ProductDetails product={completeProduct} />);

    expect(screen.getByText(completeProduct.name)).toBeInTheDocument();
    expect(screen.getByText(completeProduct.description!)).toBeInTheDocument();
    expect(screen.getByTestId("category-heap")).toBeInTheDocument();
    expect(screen.getByTestId("real-image")).toBeInTheDocument();
    expect(screen.getByTestId('price-pill')).toBeInTheDocument(); 
    expect(screen.getByTestId('stock-pill')).toBeInTheDocument();
  });

  it("Product with no description", () => {
    const product: Product = {
      name: "Cocacola",
      description: null,
      id: "1234",
      categories: ["Bebidas", "Gaseosas"],
      imageUrl: "http://cocacola.image.jpg",
      price: 6_200,
      stock: 7,
    };

    render(<ProductDetails product={product} />);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText('Sin descripcion')).toBeInTheDocument();
    expect(screen.getByTestId("category-heap")).toBeInTheDocument();
    expect(screen.getByTestId("real-image")).toBeInTheDocument();
    expect(screen.getByTestId('price-pill')).toBeInTheDocument(); 
    expect(screen.getByTestId('stock-pill')).toBeInTheDocument();
  })

  it('Product with no image url', () => {
    const product: Product = {
      name: "Cocacola",
      description: null,
      id: "1234",
      categories: ["Bebidas", "Gaseosas"],
      imageUrl: null,
      price: 6_200,
      stock: 7,
    };

    render(<ProductDetails product={product} />);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText('Sin descripcion')).toBeInTheDocument();
    expect(screen.getByTestId("category-heap")).toBeInTheDocument();
    expect(screen.getByTestId("image-placeholder")).toBeInTheDocument();
    expect(screen.getByTestId('price-pill')).toBeInTheDocument(); 
    expect(screen.getByTestId('stock-pill')).toBeInTheDocument();
  })

  it('product with no categories', () => {
    const product: Product = {
      name: "Cocacola",
      description: null,
      id: "1234",
      categories: null,
      imageUrl: null,
      price: 6_200,
      stock: 7,
    };

    render(<ProductDetails product={product} />);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText('Sin descripcion')).toBeInTheDocument();
    expect(screen.queryByTestId("category-heap")).not.toBeInTheDocument();
    expect(screen.getByText('Sin categorias')).toBeInTheDocument();
    expect(screen.getByTestId("image-placeholder")).toBeInTheDocument();
    expect(screen.getByTestId('price-pill')).toBeInTheDocument(); 
    expect(screen.getByTestId('stock-pill')).toBeInTheDocument();
  })

  it('product with void categories list', () => {
      const product: Product = {
      name: "Cocacola",
      description: null,
      id: "1234",
      categories: [],
      imageUrl: null,
      price: 6_200,
      stock: 7,
    };

    render(<ProductDetails product={product} />);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText('Sin descripcion')).toBeInTheDocument();
    expect(screen.queryByTestId("category-heap")).not.toBeInTheDocument();
    expect(screen.getByText('Sin categorias')).toBeInTheDocument();
    expect(screen.getByTestId("image-placeholder")).toBeInTheDocument();
    expect(screen.getByTestId('price-pill')).toBeInTheDocument(); 
    expect(screen.getByTestId('stock-pill')).toBeInTheDocument();
  })
});
