export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex flex-1 flex-col gap-2 items-center justify-center">
      <svg className="size-24">
        <use href="sprite.svg#alert" />
      </svg>
      <span className="text-lg font-bold">Ups, ha ocurrido un error!</span>
      <span>{message}</span>
    </div>
  );
}
