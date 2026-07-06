export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  isLast: boolean;
  isFirst: boolean;
  onUpdatePage: (newPage: number) => void;
};

export function Pagination(props: PaginationProps) {
  const { currentPage, isFirst, isLast, onUpdatePage, totalPages } = props;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <div className="flex flex-1 justify-center items-center gap-2">
      <button
        onClick={() => onUpdatePage(currentPage - 1)}
        disabled={isFirst}
        className="bg-blue-100 text-blue-900 py-1 rounded-md disabled:opacity-50"
      >
        <svg className="size-6">
          <use href="sprite.svg#navigate-back" />
        </svg>
      </button>

      {pages.map((page) => (
        <PageButton
          key={page}
          page={page}
          isSelected={page - 1 === currentPage}
          onSelect={onUpdatePage}
        />
      ))}

      <button
        disabled={isLast}
        onClick={() => onUpdatePage(currentPage + 1)}
        className="bg-blue-100 text-blue-900 py-1 rounded-md disabled:opacity-50"
      >
        <svg className="size-6">
          <use href="sprite.svg#navigate-next" />
        </svg>
      </button>
    </div>
  );
}

type PageButtonProps = {
  isSelected: boolean;
  page: number;
  onSelect: (page: number) => void;
};

function PageButton(props: PageButtonProps) {
  const { isSelected, page, onSelect } = props;
  return (
    <button
      disabled={isSelected}
      onClick={() => onSelect(page - 1)}
      className="bg-blue-100 text-black disabled:bg-blue-700 disabled:text-white disabled:opacity-50 px-2.5 py-1 rounded-md"
    >
      {page}
    </button>
  );
}
