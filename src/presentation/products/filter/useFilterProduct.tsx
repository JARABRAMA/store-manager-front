import { useEffect, useState } from "react";
import { filterProductsUseCase, findAllCategoriesUseCase } from "../../../di";
import type { Product } from "../../../domain/model/Product";
import { useSearchParams } from "react-router";
import { useDebounceValue } from "../../shared/hooks/useDebounceValue";
import {
  usePagination,
  type PaginationUIData,
} from "../../shared/hooks/usePagination";

export type FilterProductData = {
  categories: string[];
  loading: boolean;
  error: string | null;
  products: Product[];
  search: string;
  onUpdateSearch: (value: string) => void;
  category: string;
  onUpdateCategory: (value: string) => void;
  paginationData: PaginationUIData;
  onUpdatePaginationData: (data: PaginationUIData) => void;
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
  const debouncedSearch = useDebounceValue(search, 500);
  const { paginationData, onUpdatePaginationData } = usePagination();
  const { currentPage: page } = paginationData;

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
        onUpdatePaginationData({
          currentPage: products.page,
          totalPages: products.totalPages,
          isFirst: products.first,
          isLast: products.last,
        });
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setProductsLoading(false);
      }
    };
    loadProducts();
  }, [category, debouncedSearch, page]);
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
  // if the category filter updates, currentPage should be set to cero

  return {
    categories,
    loading: categoriesLoading || productsLoading,
    error,
    products,
    search,
    onUpdateSearch: (value: string) => {
      setSearch(value);
      onUpdatePaginationData({ ...paginationData, currentPage: 0 });
    },
    category,
    onUpdateCategory: (value: string) => {
      setCategory(value);
      onUpdatePaginationData({ ...paginationData, currentPage: 0 });
    },
    paginationData,
    onUpdatePaginationData,
  };
}
