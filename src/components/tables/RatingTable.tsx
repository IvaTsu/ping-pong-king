import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type Row,
  type RowData,
  useReactTable,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";

import { fetchPlayerList } from "../../api/player/get/queries";
import { type IPlayer } from "../../api/player/get/types";
import { AQUA, NAVY } from "../../constants/colors";
import { tenMinutes } from "../../constants/time";
import { useDetectDarkTheme } from "../../hooks/useDetectColorMode";
import { useTablePagination } from "../../hooks/useTablePagination";
import { useAuthStore, useUserStore } from "../../store";
import { hyphenate } from "../../utils/string";
import { LoadingSpinner } from "../LoadingSpinner";

interface ICustomTableMeta<TData extends RowData> {
  getRowStyles: (row: Row<TData>) => React.CSSProperties;
}

const columnHelper = createColumnHelper<IPlayer>();
export const userColumnDefs = [
  columnHelper.accessor((row) => row.name, {
    id: "name",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor((row) => row.rating, {
    id: "rating",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Rating</span>,
  }),
  columnHelper.accessor((row) => row.tournamentRef.name, {
    id: "office",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Office</span>,
  }),
  columnHelper.accessor((row) => row.gamesPlayed, {
    id: "gamesPlayed",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Games played</span>,
  }),
];

export const RatingTable = (): JSX.Element => {
  const {
    sorting,
    setSorting,
    pagination,
    setPagination,
    pageIndex,
    pageSize,
  } = useTablePagination();

  const { getAuth } = useAuthStore();
  const auth = getAuth();
  const { getUser } = useUserStore();
  const currentUser = getUser();
  const isDarkTheme = useDetectDarkTheme();
  const currentUserRowBgColor = isDarkTheme ? AQUA : NAVY;

  const { data: playerList, isLoading } = useQuery(
    ["playerList", fetchPlayerList, pagination, auth?.accessToken],
    async () =>
      await fetchPlayerList({
        accessToken: auth?.accessToken as string,
        page: pageIndex,
        size: pageSize,
        minGamesPlayed: 1,
      }),
    {
      keepPreviousData: true,
      retry: false,
      enabled: auth?.accessToken != null,
      staleTime: tenMinutes,
    }
  );

  const table = useReactTable({
    columns: userColumnDefs,
    data: playerList?.content ?? [],
    pageCount: playerList?.pageable.totalPages,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    manualPagination: true,
    meta: {
      getRowStyles: (row: Row<IPlayer>) =>
        row.original.id === currentUser?.id
          ? { border: `${currentUserRowBgColor} 2px solid` }
          : {},
    },
  });
  const headers = table.getFlatHeaders();
  const rows = table.getRowModel().rows;
  const currentPage = table.getState().pagination.pageIndex;
  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="overflow-x-auto py-10">
      <table className="table w-full">
        <thead>
          <tr>
            {headers.map((header) => {
              const direction = header.column.getIsSorted();
              const arrow = {
                asc: "🔼",
                desc: "🔽",
              };
              const sortIndicator =
                (direction === "asc" || direction === "desc") &&
                arrow[direction];
              return (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer flex gap-4 font-ubuntuBold"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {direction !== false && <span>{sortIndicator}</span>}
                    </div>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              style={{
                ...(
                  table.options.meta as ICustomTableMeta<IPlayer>
                )?.getRowStyles(row),
              }}
            >
              {row.getVisibleCells().map((cell, index) => (
                <td key={cell.id}>
                  {playerList?.content[0].id === row.original.id &&
                    index === 0 &&
                    currentPage === 0 && (
                      <div className="animate-bounce inline-block text-xl sm:text-2xl">
                        👑
                      </div>
                    )}
                  {`   `}
                  {index === 0 ? (
                    <Link
                      to={`/player-history/${hyphenate(row.original.name)}`}
                      state={{
                        playerId: row.original.id,
                        playerName: row.original.name,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Link>
                  ) : (
                    <>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </>
                  )}
                  {`   `}
                  {playerList?.content[0].id === row.original.id &&
                    index === 0 &&
                    currentPage === 0 && (
                      <div className="animate-bounce inline-block text-xl sm:text-2xl">
                        👑
                      </div>
                    )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="my-2">
        <div className="flex items-start sm:items-center flex-col sm:flex-row  gap-2">
          <div className="btn-group flex justify-between sm:justify-start w-full sm:w-fit">
            <div>
              <button
                className="btn btn-sm"
                onClick={() => {
                  table.setPageIndex(0);
                }}
                disabled={!table.getCanPreviousPage()}
              >
                {"<<"}
              </button>
              <button
                className="btn btn-sm"
                onClick={() => {
                  table.previousPage();
                }}
                disabled={!table.getCanPreviousPage()}
              >
                {"<"}
              </button>
              <button
                className="btn btn-sm"
                onClick={() => {
                  table.nextPage();
                }}
                disabled={!table.getCanNextPage()}
              >
                {">"}
              </button>
              <button
                className="btn btn-sm"
                onClick={() => {
                  table.setPageIndex(table.getPageCount() - 1);
                }}
                disabled={!table.getCanNextPage()}
              >
                {">>"}
              </button>
            </div>
            <span className="flex items-center gap-1 ml-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
          </div>
          <div className="flex">
            <span className="flex items-center gap-1 before:content-[''] sm:before:content-['|_'] ">
              Go to page:
              <input
                defaultValue={currentPage + 1}
                type="number"
                onChange={(e) => {
                  const page =
                    e.target.value != null ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="input input-bordered w-20 input-sm mx-2 focus:outline-none dark:focus:border-aqua focus:border-navy"
              />
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="select select-sm select-bordered focus:outline-none dark:focus:border-aqua focus:border-navy"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
