export type FilterProductData = {
  categories: string[];
};

export function FilterProductsForm(data: FilterProductData) {
  const { categories } = data;
  return (
    <form className="border mx-2 grid grid-cols-[auto_1fr_auto] gap-4 rounded-xl px-4 py-1.5">
      <svg className="size-6">
        <use href="sprite.svg#search" />
      </svg>
      <input
        placeholder="Buscar productos por nombre y descripcion"
        className="w-full box-border focus:outline-0 text-gray-100"
      />
      <select>
        <option value="">Categorias</option>
        {categories.map((c) => {
          return (
            <option key={c} value={c}>
              {c}
            </option>
          );
        })}
      </select>
    </form>
  );
}
