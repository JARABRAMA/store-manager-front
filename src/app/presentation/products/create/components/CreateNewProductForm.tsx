import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "../../../shared/components/Input";
import { useCategoriesPicker } from "../hooks/useCategoriesPicker";
import {
  newProductSchema,
  type NewProductFormData,
} from "../schemas/NewProductSchema";
import { CategoriesPicker } from "./CategoriesPicker";
import { zodResolver } from "@hookform/resolvers/zod";

export function CreateNewProductForm() {
  const categoriesPickerState = useCategoriesPicker();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewProductFormData>({
    resolver: zodResolver(newProductSchema),
  });

  const onSubmit: SubmitHandler<NewProductFormData> = (data) => {
    console.log(data);
    // todo: nothing jet
  };
  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
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

      <button className="col-span-2 justify-self-end  px-3 py-1 rounded-md self-end bg-blue-600 w-fit">
        Guardar
      </button>
    </form>
  );
}
