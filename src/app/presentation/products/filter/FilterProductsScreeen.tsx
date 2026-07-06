import { LoadingSpinner } from "../../shared/components/LoadingSpinner.tsx";
import { FilterProductsForm } from "./components/FilterProductForm.tsx";
import { useFilterProduct, type FilterProductData } from "./useFilterProduct";
import { ErrorMessage } from "../../shared/components/ErrorMessage.tsx";
import { Pagination } from "../../shared/components/Pagination.tsx";
import { ProductCard } from "./components/ProductCard.tsx";
import { FilterProductsTopBar } from "./components/FilterProductsTopBar.tsx";

export function FilterProductsScreen() {
  const {
    categories,
    loading,
    error,
    products,
    category,
    onUpdateCategory,
    onUpdateSearch,
    search,
    onUpdatePaginationData,
    paginationData,
  }: FilterProductData = useFilterProduct();

  return (
    <div className="flex flex-col flex-1 gap-2 bg-gray-900 text-gray-100  min-h-0">
      <FilterProductsTopBar title="Inventario" />
      <main className="flex flex-col flex-1 gap-2 min-h-0">
        <FilterProductsForm
          category={category}
          setCategory={onUpdateCategory}
          search={search}
          setSearch={onUpdateSearch}
          categories={categories}
        />
        {loading && (
          <div className="flex flex-1 items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <div className="grid grid-rows-[1fr_auto] overflow-y-auto h-full gap-4 pb-4">
            <section className="flex flex-col gap-2 px-2">
              {products.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </section>
            <Pagination
              currentPage={paginationData.currentPage}
              isFirst={paginationData.isFirst}
              isLast={paginationData.isLast}
              totalPages={paginationData.totalPages}
              onUpdatePage={(page: number) =>
                onUpdatePaginationData({
                  ...paginationData,
                  currentPage: page,
                })
              }
            />
          </div>
        )}
      </main>
    </div>
  );
}
