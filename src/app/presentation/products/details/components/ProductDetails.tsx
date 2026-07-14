import type { Product } from "../../../../domain/model/Product";
import { ImageWithPlaceholder } from "../../../shared/components/ImageWithPlaceholder";
import { ProductActions } from "./ProductActions";
import { CategoriesHeap } from "../../shared/components/CategoriesHeap";
import { PricePill } from "./PricePIll";
import { StockPill } from "./StockPill";

export function ProductDetails({ product }: { product: Product }) {
  return (
    <article className="flex flex-col flex-1 gap-5">
      <ImageWithPlaceholder
        alt={product.name}
        src={product.imageUrl}
        className="w-full object-cover max-h-70 mask-b-from-40% p-5 bg-white border-none"
      />
      <div className="flex flex-col">
        <span className="text-xl px-4 font-bold">{product.name}</span>
        <span className="px-4">{product.description ?? "Sin descripcion"}</span>
      </div>

      <div className="flex justify-around">
        <PricePill price={product.price} />
        <StockPill stock={product.stock} />
      </div>

      <CategoriesSection categories={product.categories} />
      <ProductActions productId={product.id!} /> 
    </article>
  );
}

function CategoriesSection({ categories }: { categories: string[] | null }) {
  return (
    <div className="px-4 flex flex-col">
      <span className="text-lg font-bold">Categorias:</span>
      {categories && categories.length !== 0 && (
        <CategoriesHeap selectedCategories={categories!} />
      )}
      {(categories === null || categories.length === 0) && (
        <span className="self-center p-4">Sin categorias</span>
      )}
    </div>
  );
}
