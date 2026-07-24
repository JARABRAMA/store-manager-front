import { useNavigate } from "react-router";
import { TopBar } from "../../shared/components/TopBar.tsx";
import { CreateNewProductForm } from "./components/CreateNewProductForm.tsx";

export function CreateNewProductScreen() {
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1);
  };
  return (
    <main className="flex flex-col flex-1 gap-2 bg-gray-900 text-gray-100  min-h-0">
      <TopBar title="Agregar producto nuevo" navigateBack />
      <section className="px-4">
        <CreateNewProductForm navigateBack={navigateBack} />
      </section>
    </main>
  );
}
