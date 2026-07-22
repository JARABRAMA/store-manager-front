import { useCases } from "../../../../di";
import { Input } from "../../../shared/components/Input";
import { useCreateNewProductForm } from "../hooks/useCreateNewProductForm";
import { CategoriesPicker } from "./CategoriesPicker";


export function CreateNewProductForm() {
  const saveProductUseCase = useCases.saveProductUseCase;
  const {
    onSubmit,
    register,
    message,
    errors,
    isSubmitting,
    categoriesPickerState,
  } = useCreateNewProductForm({ saveProductUseCase: saveProductUseCase });

  return (
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

      <button
        disabled={isSubmitting}
        className="col-span-2 justify-self-end disabled:opacity-30 px-3 py-1 rounded-md self-end bg-blue-600 w-fit"
      >
        {isSubmitting ? "Cargando..." : "Guardar"}
      </button>
    </form>
  );
}
