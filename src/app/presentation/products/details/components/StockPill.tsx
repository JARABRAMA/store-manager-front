const colorClasses = {
  green: 'bg-green-800', 
  yellow: 'bg-yellow-800',
  red: 'bg-red-800'
}

export function StockPill({ stock }: { stock: number }) {
  const color = stock <= 0 ? colorClasses.red : stock <= 5 ? colorClasses.yellow : colorClasses.green
  return (
    <div data-testid='stock-pill' className={`flex  px-3 py-0.5 rounded-full gap-2 ${color}`}>
      <span>Unidades: </span>
      <span>{stock}</span>
    </div>
  );
}
