import { Link, useLocation } from "react-router";

export function NavigationBar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="flex justify-around px-8 py-2 text-blue-50 bg-slate-700">
      <NavigationIcon
        path="/products"
        icon="/sprite.svg#box"
        title="Productos"
        selected={pathname.startsWith("/products")}
      />
      <NavigationIcon
        path="/sales"
        icon="/sprite.svg#sales"
        title="Ventas"
        selected={pathname.startsWith("/sales")}
      />
      <NavigationIcon
        path="/purchases"
        icon="/sprite.svg#purchases"
        title="Compras"
        selected={pathname.startsWith("/purchases")}
      />
    </div>
  );
}

type NavigationIconData = {
  path: string;
  title: string;
  icon: string;
  selected: boolean;
};

function NavigationIcon(params: NavigationIconData) {
  const { title, icon, path, selected } = params;

  return (
    <Link
      className={`flex justify-center text-sm flex-col items-center py-1 px-2 ${selected ? "bg-blue-950 text-slate-300 rounded-xl" : ""}`}
      to={path}
    >
      <svg className="size-7">
        <use href={icon} />
      </svg>
      {title}
    </Link>
  );
}
