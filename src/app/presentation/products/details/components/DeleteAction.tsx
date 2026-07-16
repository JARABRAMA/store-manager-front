import { useState } from "react";
import { AlertDialog, type AlertDialogProps } from "../../../shared/components/AlertDialog";

export function DeleteAction({ productId }: { productId: string }) {
  const [openedDialog, setOpenedDialog] = useState(false);

  const deleteDialogProps: AlertDialogProps = {
    title: "Seguro de eliminar producto",
    description: "Si eliminas el producto no podras recuperarlo despues",
    isOpen: openedDialog,
    onConfirm: () => {
      console.log("Delete");
    },
    onDismiss: () => {
      setOpenedDialog(false);
    },
  };

  return (
    <>
      <AlertDialog {...deleteDialogProps} />

      <button
        onClick={() => {
          setOpenedDialog(true);
        }}
        className="bg-red-800 px-4 py-2 rounded-xl  "
        data-testid="delete-button"
      >
        Eliminar producto
      </button>
    </>
  );
}
