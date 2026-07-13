import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductActions } from "../../../../../app/presentation/products/create/components/ProductActions";

describe("Product Actions component testing", () => {
  
  it('should contains delete and edit button', () =>  {
    render(<ProductActions productId="slkjfasdfas1234d" /> )
  
    expect(screen.getByTestId('delete-button')).toBeInTheDocument() 
    expect(screen.getByTestId('edit-button')).toBeInTheDocument() 
  })
})