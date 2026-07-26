import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { CategoriesUIState } from "../../products/create/hooks/useCategoriesPicker";
import type { ProductFormValues } from "../schemas/ProductSchema";
import { SimpleDialog } from "./SimpleDialog";
import { SuccessMessage } from "./SuccessMessage";
import { CategoriesPicker } from "../../products/create/components/CategoriesPicker";
import { Input } from "./Input";

export type ProductFormProps = {
  onSubmit: (e: React.FormEvent) => void;
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  isSubmitting: boolean;
  categoriesPickerState: CategoriesUIState;
  successMessage?: string;
  onDismissSuccessMessage: () => void;
  navigateBack?: () => void;
  submitLabel?: string;
};

export function ProductForm({
  onSubmit,
  register,
  errors,
  isSubmitting,
  categoriesPickerState,
  successMessage,
  onDismissSuccessMessage,
  navigateBack,
  submitLabel = "Guardar",
}: ProductFormProps) {
  return (
    <>
      <form
        noValidate
        onSubmit={onSubmit}
        data-testid="form"
        className="grid grid-cols-2 gap-2"
      >
        <Input
          name="name"
          className="col-span-2"
          label="Nombre"
          placeholder="Papas margarita 100gr"
          register={register}
          error={errors.name}
        />
        <Input
          register={register}
          error={errors.description}
          className="col-span-2"
          label="Descripcion"
          name="description"
          placeholder="Papas fritas margarita paquete de 100gr"
        />
        <Input
          register={register}
          error={errors.price}
          label="Precio"
          name="price"
          placeholder="2200"
        />
        <Input
          name="stock"
          register={register}
          error={errors.stock}
          label="Unidades disponibles"
          placeholder="12"
        />
        <Input
          register={register}
          error={errors.imageUrl}
          className="col-span-2"
          label="Url de imagen"
          name="imageUrl"
          placeholder="http://image.url.jpg"
        />
        <CategoriesPicker
          categories={categoriesPickerState.categories}
          onRemoveCategory={categoriesPickerState.onRemoveCategory}
          onSelectCategory={categoriesPickerState.onSelectCategory}
          selectedCategories={categoriesPickerState.selectedCategories}
        />
        {errors.root && (
          <span data-testid="form-error" className="text-red-400 col-span-2">
            {errors.root.message}
          </span>
        )}
        <button
          disabled={isSubmitting}
          className="col-span-2 justify-self-end disabled:opacity-30 px-3 py-1 rounded-md self-end bg-blue-600 w-fit"
        >
          {isSubmitting ? "Cargando..." : submitLabel}
        </button>
      </form>
      <SimpleDialog
        open={successMessage !== undefined}
        onClose={() => {
          onDismissSuccessMessage();
          navigateBack?.();
        }}
      >
        <SuccessMessage message={successMessage!} />
      </SimpleDialog>
    </>
  );
}
