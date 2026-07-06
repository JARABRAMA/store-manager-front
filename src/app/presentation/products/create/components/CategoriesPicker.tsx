import { CategoriesHeap } from "./CategoriesHeap";
import { CategorySelector } from "./CategorySelector";

export type CategoriesPickerProps = {
  selectedCategories: string[];
  categories: string[];
  onRemoveCategory: (category: string) => void;
  onSelectCategory: (category: string) => void;
};

export function CategoriesPicker({
  selectedCategories,
  categories,
  onRemoveCategory,
  onSelectCategory,
}: CategoriesPickerProps) {
  return (
    <div className="flex flex-col col-span-2 py-4 gap-3">
      <span>Selecciona categorias</span>
      <CategoriesHeap
        onRemoveCategory={onRemoveCategory}
        selectedCategories={selectedCategories}
      />
      <CategorySelector
        categories={categories}
        onSelectCategory={onSelectCategory}
      />
    </div>
  );
}
