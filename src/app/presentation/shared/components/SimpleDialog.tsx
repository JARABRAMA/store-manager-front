import { useEffect, useRef } from "react";

export type SimpleDialogProps = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
};

export function SimpleDialog({ children, open, onClose }: SimpleDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.setAttribute("open", "");
    } else {
      dialogRef.current?.removeAttribute("open");
    }
  }, [open]);

  return (
    <dialog
      className="absolute m-auto inset-s-0 inset-e-0 rounded-xl p-8 bg-gray-800 text-gray-200 border border-gray-500 shadow-md"
      data-testid="simple-dialog"
      ref={dialogRef}
    >
      {children}
      <button
        className="bg-blue-600 text-white px-4 rounded-md mt-4 inset-s-0"
        data-testid="close-button"
        onClick={onClose}
      >
        Cerrar
      </button>
    </dialog>
  );
}
