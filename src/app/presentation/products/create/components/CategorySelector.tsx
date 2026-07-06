import { useState } from "react";
import { IconButton } from "../../../shared/components/IconButton";

export type CategorySelectorProps = {
  categories: string[];
  onSelectCategory: (category: string) => void;
};

export function CategorySelector({
  categories,
  onSelectCategory,
}: CategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const onChangeSelectedCategory = (value: string) =>
    setSelectedCategory(value);

  return (
    <div className="flex justify-center gap-4">
      <select
        className="border border-gray-300 rounded-md"
        value={selectedCategory}
        onChange={(e) => {
          onChangeSelectedCategory(e.target.value);
        }}
      >
        <option value="">Selecciona</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <IconButton
        icon="/sprite.svg#plus"
        className="bg-blue-600 rounded-full p-1"
        onClick={() => onSelectCategory(selectedCategory)}
      />
    </div>
  );
}
