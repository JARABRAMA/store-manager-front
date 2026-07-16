import { DeleteAction } from "./DeleteAction";

export function ProductActions({ productId }: { productId: string }) {
  return (
    <div className="flex justify-around">
      <button
        className="bg-blue-800 px-4 py-2 rounded-xl"
        data-testid="edit-button"
      >
        Editar producto
      </button>
      <DeleteAction productId={productId} />
    </div>
  );
}
