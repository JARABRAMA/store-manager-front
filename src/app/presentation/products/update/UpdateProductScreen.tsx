import { TopBar } from "../../shared/components/TopBar";
import { UpdateProductForm } from "./UpdateProductForm";

export function UpdateProductScreen() {
  return (
    <main className="flex flex-col flex-1 gap-2 bg-gray-900 text-gray-100  min-h-0">
      <TopBar title="Editar producto" navigateBack />
      <UpdateProductForm />
    </main>
  );
}
