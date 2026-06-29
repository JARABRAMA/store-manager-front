import { useEffect, useState } from "react";
import { filterProductsUseCase, findAllCategoriesUseCase } from "../../../di";
import type { Product } from "../../../domain/model/Product";

export type FilterProductData = {
  categories: string[];
  loading: boolean;
  error: string | null;
  products: Product[];
};

export function useFilterProduct(): FilterProductData {
  const [categories, setCategories] = useState<string[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  // load categories
  useEffect(() => {
    const loadCategories = async () => {
      setCategoriesLoading(true);
      try {
        const categories = await findAllCategoriesUseCase();
        setCategories(categories);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setCategoriesLoading(false);
      }
    };
    loadCategories();
  }, []);
  // load products
  useEffect(() => {
    const loadProducts = async () => {
      setProductsLoading(true);
      try {
        const products = await filterProductsUseCase({
          category,
          page,
          search,
        });
        setProducts(products.content);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setProductsLoading(false);
      }
    };
    loadProducts();
  }, [category, page, search]);

  return {
    categories,
    loading: categoriesLoading || productsLoading,
    error,
    products,
  };
}
