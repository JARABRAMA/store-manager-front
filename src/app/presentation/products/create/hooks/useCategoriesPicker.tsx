import { useEffect, useState } from "react";
import { useCases } from "../../../../di.ts";

type CategoriesUIState = {
  categoriesLoading: boolean;
  categoriesError?: string | undefined;
  selectedCategories: string[];
  categories: string[];
  onRemoveCategory: (category: string) => void;
  onSelectCategory: (category: string) => void;
};

export function useCategoriesPicker(
  findAllCategoriesUseCase: () => Promise<string[]> = useCases.findAllCategoriesUseCase,
): CategoriesUIState {
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>();

  // first load categories
  useEffect(() => {
    const fetchAllCategories = async () => {
      setLoading(true);
      try {
        const categories = await findAllCategoriesUseCase();
        setCategories(categories);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.log(e.message);
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAllCategories();
  }, []);

  const onRemoveCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : prev,
    );
  };

  const onSelectCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev : [...prev, category],
    );
  };

  return {
    onRemoveCategory,
    onSelectCategory,
    categoriesLoading: loading,
    categoriesError: error,
    categories,
    selectedCategories,
  };
}
