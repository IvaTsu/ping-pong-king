import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { type IPlayer, type IPlayerRating } from "../api/player/get/types";

// make a generic component for building tables

type ColumnHelper = IPlayer | IPlayerRating;

export const buildColumnDefs = (
  columns: string[]
): Array<ColumnDef<ColumnHelper, never>> => {
  const columnHelper = createColumnHelper<ColumnHelper>();
  return columns.map((column) => {
    return columnHelper.accessor((row) => row[column as keyof ColumnHelper], {
      id: column,
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>{column}</span>,
    });
  });
};
