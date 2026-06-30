import { useState } from "react";

export type PaginationUIData = {
  currentPage: number;
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
};

export function usePagination() {
  const [paginationData, setPaginationData] = useState<PaginationUIData>({
    currentPage: 0,
    totalPages: 0,
    isFirst: true,
    isLast: true,
  });

  const onUpdatePaginationData = (data: PaginationUIData) => {
    setPaginationData(data);
  };

  return {
    paginationData,
    onUpdatePaginationData,
  };
}
