export type FilterProductData = {
  categories: string[];
  category: string;
  setCategory: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
};

export function FilterProductsForm(data: FilterProductData) {
  const { categories, category, search, setCategory, setSearch } = data;
  return (
    <form className="border mx-2 grid grid-cols-[auto_1fr_auto] gap-4 rounded-xl px-4 py-1.5">
      <svg className="size-6">
        <use href="sprite.svg#search" />
      </svg>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar productos por nombre y descripcion"
        className="w-full box-border focus:outline-0 text-gray-100"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
