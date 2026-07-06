import { IconButton } from "../../../shared/components/IconButton";

export type CategoriesHeapProps = {
  selectedCategories: string[];
  onRemoveCategory: (category: string) => void;
};

export function CategoriesHeap({
  selectedCategories,
  onRemoveCategory,
}: CategoriesHeapProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-center w-full col-span-2">
      {selectedCategories.map((category) => (
        <CategoryPill category={category} onRemoveCategory={onRemoveCategory} />
      ))}
    </div>
  );
}

type CategoryPillProps = {
  category: string;
  onRemoveCategory: (category: string) => void;
};
function CategoryPill({ category, onRemoveCategory }: CategoryPillProps) {
  return (
    <div className="flex flex-wa bg-blue-200 rounded-xl px-2 text-black">
      <span>{category}</span>
      <IconButton
        icon="/sprite.svg#close"
        onClick={() => onRemoveCategory(category)}
      />
    </div>
  );
}
