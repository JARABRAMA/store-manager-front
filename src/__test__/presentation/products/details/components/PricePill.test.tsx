import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PricePill } from "../../../../../app/presentation/products/details/components/PricePIll";

describe("Price pill component",  () => {
  it("should show the price", () => {
    const price = 6500

    render(<PricePill price={price} />)

    expect(screen.getByText('Precio:')).toBeInTheDocument()
    expect(screen.getByText(price.toString())).toBeInTheDocument()
  })
})