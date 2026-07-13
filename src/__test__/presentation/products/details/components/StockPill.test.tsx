import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StockPill } from "../../../../../app/presentation/products/details/components/StockPill";

describe("Stock pill component", () => {
  it("should show the stock number", () => {
    const stock = 3;

    render(<StockPill stock={stock} />);

    expect(screen.getByText("Unidades:")).toBeInTheDocument();
    expect(screen.getByText(stock.toString())).toBeInTheDocument();
  });

  it("should be green when more than 5 products", () => {
    render(<StockPill stock={78} />);
    expect(screen.getByTestId("stock-pill")).toHaveClass("bg-green-800");
  });

  it("should be yellow when 5 of less products", () => {
    render(<StockPill stock={5} />);
    expect(screen.getByTestId("stock-pill")).toHaveClass("bg-yellow-800");
  });

  it("should be red when no products", () => {
    render(<StockPill stock={0} />);
    expect(screen.getByTestId("stock-pill")).toHaveClass("bg-red-800");
  });
});
