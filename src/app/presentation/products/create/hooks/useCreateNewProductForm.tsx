import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useCases } from "../../../../di";
import type { Product } from "../../../../domain/model/Product";
import {
  newProductSchema,
  type NewProductFormData,
} from "../schemas/NewProductSchema";
import { useCategoriesPicker } from "./useCategoriesPicker";

export function useCreateNewProductForm({
  saveProductUseCase = useCases.saveProductUseCase,
}: {
  saveProductUseCase?: (product: Product) => Promise<string>;
}) {
  const categoriesPickerState = useCategoriesPicker();
  const [successMessage, setSuccessMessage] = useState<string>();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<NewProductFormData>({
    resolver: zodResolver(newProductSchema),
  });

  const onSubmit: SubmitHandler<NewProductFormData> = async (data) => {
    const product: Product = {
      ...data,
      id: null,
      categories: categoriesPickerState.selectedCategories,
    } as unknown as Product;
    try {
      const message = await saveProductUseCase(product);
      setSuccessMessage(message);
    } catch (e) {
      const error = e as Error;
      setError("root", {
        type: "server",
        message: error.message,
      });
    }
  };

  const onDismissSuccessMessage = () => {
    setSuccessMessage(undefined);
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    register,
    successMessage,
    errors,
    isSubmitting,
    categoriesPickerState,
    onDismissSuccessMessage,
  };
}
