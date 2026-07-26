import { DeleteAction } from "./DeleteAction";

export function ProductActions({
  productId,
  navigateUpdateProduct,
}: {
  productId: string;
  navigateUpdateProduct?: (productId: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 justify-between px-4">
      <button
        onClick={
          navigateUpdateProduct
            ? () => navigateUpdateProduct(productId)
            : () => { }
        }
        className="bg-blue-800 px-4 py-2 rounded-xl"
        data-testid="edit-button"
      >
        Editar producto
      </button>
      <DeleteAction productId={productId} />
    </div>
  );
}
