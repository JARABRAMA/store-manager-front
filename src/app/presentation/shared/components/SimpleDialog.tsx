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
    <dialog data-testid="simple-dialog" ref={dialogRef}>
      {children}
      <button data-testid='close-button' onClick={onClose}>Cerrar</button>
    </dialog>
  );
}
