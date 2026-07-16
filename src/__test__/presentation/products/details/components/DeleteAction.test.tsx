import { describe, expect, it } from "vitest";
import { DeleteAction } from "../../../../../app/presentation/products/details/components/DeleteAction";
import { fireEvent, render, screen } from "@testing-library/react";

describe('Delete Action component', () => {
  it('should hide dialog by default', () => {
    render(<DeleteAction productId="any" />)

    const dialog = screen.getByTestId('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog).not.toHaveAttribute('open')
  })

  it('should open the dialog when click on delete product button', () => {

    render(<DeleteAction productId="any" />)

    const deleteButton = screen.getByTestId('delete-button')
    expect(deleteButton).toBeInTheDocument()
    fireEvent.click(deleteButton)

    const dialog = screen.getByTestId('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveAttribute('open', '')
  })
})