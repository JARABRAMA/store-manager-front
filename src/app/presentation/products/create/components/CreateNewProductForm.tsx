import { Input } from "../../../shared/components/Input";
import { useCreateNewProductForm } from "../hooks/useCreateNewProductForm";
import { CategoriesPicker } from "./CategoriesPicker";

export function CreateNewProductForm() {
  const { formState, categoriesPickerState, onUpdateFormState } =
    useCreateNewProductForm({ onCreateProduct: () => { } }); // TODO: replace with real use case implementation
  return (
    <form className="grid grid-cols-2 gap-2">
      <Input
        className="col-span-2"
        label="Nombre"
        name="name"
        required
        placeholder="Papas margarita 100gr"
      />
      <Input
        className="col-span-2"
        label="Descripcion"
        name="description"
        required
        placeholder="Papas fritas margarita paquete de 100gr"
      />
      <Input
        label="Precio"
        name="price"
        required
        placeholder="2200"
        type="number"
      />
      <Input
        label="Unidades disponibles"
        name="stock"
        required
        placeholder="12"
        type="number"
      />
      <Input
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

      <button className="col-span-2 justify-self-end  px-3 py-1 rounded-md self-end bg-blue-600 w-fit">
        Guardar
      </button>
    </form>
  );
}
