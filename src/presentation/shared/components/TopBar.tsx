import { useNavigate } from "react-router";
import { IconButton } from "./IconButton";

export type TopBarParams = {
  title: string;
  navigateBack: boolean;
};

export function TopBar({ title, navigateBack = false }: TopBarParams) {
  const navigate = useNavigate();
  return (
    <header className="bg-slate-700 text-blue-50 py-4 max-h-fit flex flex-1 gap-2 px-4">
      {navigateBack && (
        <IconButton
          icon="sprite.svg#navigate-back"
          onClick={() => {
            navigate(-1);
          }}
          size="sm"
        />
      )}
      <p className="font-bold text-xl">{title}</p>
    </header>
  );
}
