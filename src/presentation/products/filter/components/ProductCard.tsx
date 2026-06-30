import type { Product } from "../../../../domain/model/Product";
import { ImageWithPlaceholder } from "../../../shared/components/ImageWithPlaceholder";

export function ProductCard(params: Product) {
  const { name, id, stock, price, imageUrl, description } = params;
  return (
    <div className="bg-slate-600 grid grid-cols-3 px-4 py-5 rounded-lg">
      <ImageWithPlaceholder
        src={imageUrl ?? ""}
        alt={`image of ${name}`}
        className="row-span-3 size-24 rounded-lg"
      />
      <span className="col-span-2 font-bold">{name}</span>
      <span className="col-span-2 text-sm">{description}</span>
      <PricePill price={price} />
      <StockPill stock={stock} />
    </div>
  );
}

const stockColor = {
  red: "bg-red-800",
  yellow: "bg-yellow-800",
  green: "bg-green-800",
};

function StockPill({ stock }: { stock: number }) {
  const color =
    stock === 0
      ? stockColor.red
      : stock <= 5
        ? stockColor.yellow
        : stockColor.green;

  return (
    <div
      className={`${color} rounded-full justify-self-center flex h-fit w-fit gap-1 px-1.5 text-white text-sm`}
    >
      <span>Unidades:</span>
      <span className="font-bold">{stock}</span>
    </div>
  );
}

function PricePill({ price }: { price: number }) {
  return (
    <div className="bg-blue-800 justify-self-center rounded-full flex h-fit w-fit gap-1 px-1.5 text-white text-sm">
      <span>Precio:</span>
      <span className="font-bold">${price}</span>
    </div>
  );
}
