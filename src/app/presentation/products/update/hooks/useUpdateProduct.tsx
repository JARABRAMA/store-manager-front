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
import { useParams } from "react-router";
import type { useCases } from "../../../../di";

export function useUpdateProduct({
  updateProduct,
  findProductById,
}: {
  updateProduct: typeof useCases.updateProductUseCase;
  findProductById: ({ id }: FindByIdCommand) => Promise<Product>;
}) {
  const { product, loading, error } = useProductDetail({
    findById: findProductById,
  });
  const categoriesPickerState = useCategoriesPicker();
  const [successMessage, setSuccessMessage] = useState<string>();
  const { productId } = useParams();

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
    const updatedProduct: Product = {
      ...data,
      id: productId!,
      categories: categoriesPickerState.selectedCategories,
    };

    console.log("updating product: ", updatedProduct);

    try {
      const message = await updateProduct(updatedProduct.id!, updatedProduct);
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
