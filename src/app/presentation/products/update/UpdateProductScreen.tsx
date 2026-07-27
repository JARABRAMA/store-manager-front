import { useNavigate } from "react-router";
import { TopBar } from "../../shared/components/TopBar";
import { UpdateProductForm } from "./UpdateProductForm";

export function UpdateProductScreen() {
  const navigate = useNavigate();
  const navigateBack = () => navigate(-1);
  return (
    <main className="flex flex-col flex-1 gap-2 bg-gray-900 text-gray-100  min-h-0">
      <TopBar title="Editar producto" navigateBack />
      <UpdateProductForm navigateBack={navigateBack} />
    </main>
  );
}
