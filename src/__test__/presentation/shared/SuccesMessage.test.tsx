import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SuccessMessage } from "../../../app/presentation/shared/components/SuccessMessage";

describe('success message component', () => {
  it('should show the passed message', () => {
    const message = 'Producto guardado correctamente'

    render(<SuccessMessage message={message} />)

    expect(screen.getByText(message)).toBeInTheDocument()
  })
})