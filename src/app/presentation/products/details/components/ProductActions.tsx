export function ProductActions({productId} : {productId: string}) {
  return <div className="flex justify-around" > 
    <button className="bg-blue-800 px-4 py-2 rounded-xl duration-300 active:scale-[.9]" data-testid='edit-button'>Editar producto</button>
    <button className="bg-red-800 px-4 py-2 rounded-xl duration-300 active:scale-[.9]" data-testid='delete-button'>Eliminar producto</button>
  </div>
}