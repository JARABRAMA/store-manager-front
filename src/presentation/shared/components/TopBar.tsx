export type TopBarParams = {
  title: string;
};

export function TopBar(params: TopBarParams) {
  const { title } = params;
  return (
    <header className="bg-slate-700 text-blue-50 py-4 max-h-fit">
      <p className="font-bold text-xl px-4">{title}</p>
    </header>
  );
}
