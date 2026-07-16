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

  return (
    <dialog data-testid="dialog" onClose={onDismiss} ref={dialogRef}>
      <div className="grid grid-cols-2 gap-4 p-8 bg-gray-800 text-gray-400">
        <svg className="col-span-2 self-center justify-self-center size-16">
          <use href='/sprite.svg#alert' />
        </svg>
        <span data-testid="title" className="col-span-2 text-2xl font-bold text-center text-white">
          {title}
        </span>
        {description && (
          <span data-testid="description" className="col-span-2 text-center">
            {description}
          </span>
        )}

        <button className="bg-blue-800 text-white py-1 rounded-xl" onClick={onDismiss} data-testid="dismiss-button">
          Cerrar
        </button>
        <button className="bg-red-800 text-white py-1 rounded-xl" onClick={onConfirm} data-testid="confirm-button">
          Continuar
        </button>
      </div>
    </dialog>
  );
}
