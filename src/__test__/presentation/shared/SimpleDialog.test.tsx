import { describe, expect, it, vi } from "vitest";
import { SimpleDialog, type SimpleDialogProps } from "../../../app/presentation/shared/components/SimpleDialog";
import { act, fireEvent, getByTestId, render, renderHook, screen } from "@testing-library/react";
import { useState } from "react";

describe("simple dialog component", () => {
  it("dialog should be not visible when not open", () => {
    const children = (() => {
      return <div data-testid='children'>hello world</div>;
    })


    const props: SimpleDialogProps = {
      children: children(),
      onClose: () => { },
      open: false
    };

    render(<SimpleDialog {...props} />)

    expect(screen.getByTestId('simple-dialog')).toBeInTheDocument()
    expect(screen.getByTestId('simple-dialog')).not.toHaveAttribute('open')

  });

  it("dialog should be be visible when", () => {
    const children = (() => {
      return <div data-testid='children'>hello world</div>;
    })


    const props: SimpleDialogProps = {
      children: children(),
      onClose: () => { },
      open: true
    };

    render(<SimpleDialog {...props} />)

    expect(screen.getByTestId('simple-dialog')).toBeInTheDocument()
    expect(screen.getByTestId('children')).toBeInTheDocument()
    expect(screen.getByTestId('simple-dialog')).toHaveAttribute('open')

  });

  it("should perform on close when close button was pressed", () => {
    const children = (() => {
      return <div data-testid='children'>hello world</div>;
    })

    const onClose = vi.fn()
    const { result } = renderHook(() => useState(true))

    const props: SimpleDialogProps = {
      children: children(),
      onClose,
      open: result.current[0]
    };

    render(<SimpleDialog {...props} />)

    const closeButton = screen.getByTestId('close-button')
    fireEvent.click(closeButton)
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(screen.getByTestId('simple-dialog')).toBeInTheDocument()
  });
});
