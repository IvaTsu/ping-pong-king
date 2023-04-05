import { type PaginationState, type SortingState } from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface IUseTablePagination {
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  pageIndex: number;
  pageSize: number;
}

export const useTablePagination = (): IUseTablePagination => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  return {
    sorting,
    setSorting,
    pagination,
    setPagination,
    pageIndex,
    pageSize,
  };
};
