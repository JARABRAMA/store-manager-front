import { describe, it, expect, vi } from "vitest";
import {
  type AlertDialogProps,
  AlertDialog,
} from "../../../app/presentation/shared/components/AlertDialog";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Alert dialog Component", () => {
  it("should show dialog when is opened", async () => {
    const props: AlertDialogProps = {
      title: "Dialog",
      onConfirm: () => { },
      onDismiss: () => { },
      isOpen: true,
    };
    render(<AlertDialog {...props} />);
    const dialog = screen.getByTestId("dialog")
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('open')
  });

  it('should not render when not opened', () => {
    const props: AlertDialogProps = {
      title: "Dialog",
      onConfirm: () => { },
      onDismiss: () => { },
      isOpen: false,
    };
    render(<AlertDialog {...props} />);
    const dialog = screen.getByTestId('dialog')
    expect(dialog).not.toHaveAttribute('open')
  })

  it('should show title and description when description was passed', () => {
    const props: AlertDialogProps = {
      title: "Dialog",
      description: 'description of the dialog',
      onConfirm: () => { },
      onDismiss: () => { },
      isOpen: true,
    };

    render(<AlertDialog {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument()
    expect(screen.getByTestId('title')).toBeInTheDocument()
    expect(screen.queryByTestId('description')).toBeInTheDocument()
    expect(screen.getByText(props.description!)).toBeInTheDocument()
  })

  it('should show title, but not description when not description', () => {
    const props: AlertDialogProps = {
      title: "Dialog",
      onConfirm: () => { },
      onDismiss: () => { },
      isOpen: true,
    };

    render(<AlertDialog {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument()
    expect(screen.getByTestId('title')).toBeInTheDocument()
    expect(screen.queryByTestId('description')).not.toBeInTheDocument()
  })

  it('should show buttons and his functions', () => {
    const props: AlertDialogProps = {
      title: "Dialog",
      description: 'description of the dialog',
      onConfirm: vi.fn(),
      onDismiss: vi.fn(),
      isOpen: true,
    };

    render(<AlertDialog {...props} />)

    const confirmButton = screen.getByTestId('confirm-button');
    expect(confirmButton).toBeInTheDocument()
    fireEvent.click(confirmButton)
    expect(props.onConfirm).toHaveBeenCalledTimes(1)

    const dismissButton = screen.getByTestId('dismiss-button')
    expect(dismissButton).toBeInTheDocument()
    fireEvent.click(dismissButton)
    expect(props.onDismiss).toHaveBeenCalledTimes(1)
  })


});
