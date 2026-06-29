import { useEffect, useState } from "react";
import { filterProductsUseCase, findAllCategoriesUseCase } from "../../../di";
import type { Product } from "../../../domain/model/Product";
import { useSearchParams } from "react-router";
import { useDebounceValue } from "../../shared/hooks/useDebounceValue";

export type FilterProductData = {
  categories: string[];
  loading: boolean;
  error: string | null;
  products: Product[];
  search: string;
  onUpdateSearch: (value: string) => void;
  category: string;
  onUpdateCategory: (value: string) => void;
};

export function useFilterProduct(): FilterProductData {
  const [_, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<string[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState(0);
  const debouncedSearch = useDebounceValue(search, 500);

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
          search: debouncedSearch,
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
  }, [category, page, debouncedSearch]);
  // update url search params
  useEffect(() => {
    const params = new URLSearchParams();

    if (category !== "") {
      params.set("category", category);
    }

    if (search !== "") {
      params.set("search", search);
    }

    if (page !== 0) {
      params.set("page", page.toString());
    }

    setSearchParams(params);
  }, [category, page, search, setSearchParams]);

  return {
    categories,
    loading: categoriesLoading || productsLoading,
    error,
    products,
    search,
    onUpdateSearch: (value: string) => {
      setSearch(value);
    },
    category,
    onUpdateCategory: (value: string) => {
      setCategory(value);
    },
  };
}
