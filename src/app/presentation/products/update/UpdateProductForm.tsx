import { useCases } from "../../../di";
import { ErrorMessage } from "../../shared/components/ErrorMessage";
import { LoadingSpinner } from "../../shared/components/LoadingSpinner";
import { ProductForm } from "../../shared/components/ProductForm";
import { useUpdateProduct } from "./hooks/useUpdateProduct";

export function UpdateProductForm({
  navigateBack,
}: {
  navigateBack?: () => void;
}) {
  const findById = useCases.findByIdUseCase;
  const updateProduct = useCases.updateProductUseCase;

  const {
    onSubmit,
    register,
    successMessage,
    errors,
    isSubmitting,
    categoriesPickerState,
    onDismissSuccessMessage,
    loading,
    error,
    product,
  } = useUpdateProduct({
    findProductById: findById,
    updateProduct: updateProduct,
  });

  return (
    <section className="w-full h-full">
      {!error && loading && (
        <div className="flex flex-1 justify-center items-center w-full h-full">
          <LoadingSpinner />
        </div>
      )}
      {error && <ErrorMessage message={error} />}
      {product && (
        <div className="flex flex-1 px-4">
          <ProductForm
            categoriesPickerState={categoriesPickerState}
            errors={errors}
            register={register}
            successMessage={successMessage}
            isSubmitting={isSubmitting}
            onDismissSuccessMessage={onDismissSuccessMessage}
            onSubmit={onSubmit}
            navigateBack={navigateBack}
          />
        </div>
      )}
    </section>
  );
}
