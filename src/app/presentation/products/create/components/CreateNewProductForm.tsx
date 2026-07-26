import { useCases } from "../../../../di";
import { ProductForm } from "../../../shared/components/ProductForm";
import { useCreateNewProductForm } from "../hooks/useCreateNewProductForm";

export function CreateNewProductForm({
  navigateBack,
}: {
  navigateBack?: () => void;
}) {
  const saveProductUseCase = useCases.saveProductUseCase;
  const formState = useCreateNewProductForm({
    saveProductUseCase: saveProductUseCase,
  });

  return (
    <ProductForm
      {...formState}
      navigateBack={navigateBack}
      submitLabel="Guardar"
    />
  );
}
