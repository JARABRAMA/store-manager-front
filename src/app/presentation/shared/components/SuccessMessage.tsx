export function SuccessMessage({ message }: { message: string }) {
  return (
    <div
      data-testid="success-message"
      className="flex flex-1 flex-col gap-2 items-center justify-center">
      <svg className="size-24">
        <use href="/sprite.svg#success" />
      </svg>
      <span className="text-lg font-bold">Exito!</span>
      <span>{message}</span>
    </div>
  );
} 
