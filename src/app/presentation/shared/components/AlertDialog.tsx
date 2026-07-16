import { useEffect, useRef } from "react";

export type AlertDialogProps = {
  isOpen: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
};

export function AlertDialog({
  title,
  description,
  onDismiss,
  onConfirm,
  isOpen,
}: AlertDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.setAttribute("open", "");
    } else {
      dialog.removeAttribute("open");
    }

  }, [isOpen]);

  return <dialog data-testid="dialog"
    onClose={onDismiss}
    ref={dialogRef}>
    <span data-testid='title'>{title}</span>
    {
      description &&
      <span data-testid='description'>{description}</span>
    }

    <button onClick={onDismiss} data-testid='dismiss-button'>
      Cerrar
    </button>
    <button onClick={onConfirm} data-testid='confirm-button'>
      Continuar
    </button>

  </dialog>;
}
