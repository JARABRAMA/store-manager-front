import { useForm, type SubmitHandler } from "react-hook-form";
import type { Product } from "../../../../domain/model/Product";
import {
  productSchema,
  type ProductFormValues,
} from "../../../shared/schemas/ProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategoriesPicker } from "../../create/hooks/useCategoriesPicker";
import { useEffect, useState } from "react";
import { useProductDetail } from "../../../shared/hooks/useProductDetail";
import type { FindByIdCommand } from "../../../../application/products/FindByIdUseCase";

export function useUpdateProduct({
  updateProduct,
  findProductById,
}: {
  updateProduct: (product: Product) => Promise<string>;
  findProductById: ({ id }: FindByIdCommand) => Promise<Product>;
}) {
  const { product, loading, error } = useProductDetail({
    findById: findProductById,
  });
  const categoriesPickerState = useCategoriesPicker();
  const [successMessage, setSuccessMessage] = useState<string>();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (product) reset({ ...product });
    if (product?.categories)
      product.categories.forEach((category) =>
        categoriesPickerState.onSelectCategory(category),
      );
  }, [product, reset]); // should not put categories picker state as dependency: it causes an infinite loop

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    const product: Product = {
      ...data,
      id: null,
      categories: categoriesPickerState.selectedCategories,
    } as unknown as Product;
    try {
      const message = await updateProduct(product);
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
    loading,
    error,
    product,
  };
}
