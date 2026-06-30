import { useNavigate } from "react-router";
import { IconButton } from "../../../shared/components/IconButton";

export function FilterProductsTopBar({ title }: { title: string }) {
  const navigate = useNavigate();
  return (
    <header className="bg-slate-700 text-blue-50 py-4 max-h-fit flex flex-1 justify-between px-4">
      <p className="font-bold text-xl ">{title}</p>
      <IconButton
        icon="sprite.svg#plus"
        onClick={() => {
          navigate("/products/create");
        }}
        size="sm"
      />
    </header>
  );
}
