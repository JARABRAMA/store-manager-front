export function PricePill({ price }: { price: number }) {
  return (
    <div
      data-testid="price-pill"
      className="flex bg-blue-800 px-3 py-0.5 rounded-full gap-2"
    >
      <span>Precio:</span>
      <span className="font-bold">{price}</span>
    </div>
  );
}
