import { useState } from "react";
import {
  AlertDialog,
  type AlertDialogProps,
} from "../../../shared/components/AlertDialog";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { deleteProductUseCase } from "../../../../di";
import { SimpleDialog } from "../../../shared/components/SimpleDialog";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";
import { ErrorMessage } from "../../../shared/components/ErrorMessage";
import { SuccessMessage } from "../../../shared/components/SuccessMessage";

export function DeleteAction({ productId }: { productId: string }) {
  const [openedDialog, setOpenedDialog] = useState(false);
  const { loading, error, message, onDelete, reset } = useDeleteProduct({
    onDeleteProduct: deleteProductUseCase,
  });

  const deleteDialogProps: AlertDialogProps = {
    title: "Seguro de eliminar producto",
    description: "Si eliminas el producto no podras recuperarlo despues",
    isOpen: openedDialog,
    onConfirm: async () => {
      setOpenedDialog(false);
      await onDelete(productId);
    },
    onDismiss: () => {
      setOpenedDialog(false);
    },
  };

  return (
    <>
      <AlertDialog {...deleteDialogProps} />
      <SimpleDialog
        open={error !== undefined || message !== undefined}
        onClose={reset}
      >
        {error && (
          <div>
            <ErrorMessage message={error} />
          </div>
        )}
        {message && (
          <div>
            <SuccessMessage message={message} />
          </div>
        )}
      </SimpleDialog>
      <button
        onClick={() => {
          setOpenedDialog(true);
        }}
        className="bg-red-800 px-4 py-2 rounded-xl  "
        data-testid="delete-button"
      >
        Eliminar producto
      </button>
      {loading && (
        <div className="col-span-2">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}
