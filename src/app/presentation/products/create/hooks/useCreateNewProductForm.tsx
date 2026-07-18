import { useState } from "react";
import { useCategoriesPicker } from "./useCategoriesPicker";
import type { Product } from "../../../../domain/model/Product";

type NewProductFormData = {
  name: string;
  description: string;
  price: string;
  stock: string;
  imageUrl: string;
};

type FormNames = "name" | "description" | "price" | "stock" | "imageUrl";

export function useCreateNewProductForm({ onCreateProduct }: { onCreateProduct: (product: Product) => Promise<string> }) {
  const [formState, setFormState] = useState<NewProductFormData>({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
  });
  const categoriesState = useCategoriesPicker();

  const onUpdateFormState = (name: FormNames, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    formState,
    onUpdateFormState,
    categoriesPickerState: categoriesState,
  };
}
