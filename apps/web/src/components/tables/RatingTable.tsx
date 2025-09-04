import { useAuth0 } from "@auth0/auth0-react";
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

import { type IPlayer } from "../../api/player/get/types";
import { getRequest } from "../../api/request";
import { AQUA, NAVY } from "../../constants/colors";
import { tenMinutes } from "../../constants/time";
import { useDetectDarkTheme } from "../../hooks/useDetectColorMode";
import { useTablePagination } from "../../hooks/useTablePagination";
import { useUserStore } from "../../store";
import { hyphenate } from "../../utils/string";
import { LoadingSpinner } from "../LoadingSpinner";
import { WinRate } from "../WinRate";

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
  columnHelper.accessor((row) => row.winRate, {
    id: "winRate",
    cell: (info) => <WinRate value={info.getValue()} />,
    header: () => <span>Win Rate</span>,
  }),
  columnHelper.accessor((row) => row.gamesPlayed, {
    id: "gamesPlayed",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Games played</span>,
  }),
];

export const RatingTable = (): JSX.Element => {
  const { sorting, setSorting, pagination, setPagination } =
    useTablePagination();

  const { getUser } = useUserStore();
  const currentUser = getUser();
  const { isAuthenticated, isLoading: authLoading } = useAuth0();

  const isDarkTheme = useDetectDarkTheme();
  const currentUserRowBgColor = isDarkTheme ? AQUA : NAVY;

  const { data: playerList, isLoading } = useQuery(
    ["playerList", "mockData", pagination],
    async () => {
      const response = await getRequest({ url: "/api/players" });
      return response;
    },
    {
      enabled: isAuthenticated && !authLoading, // Only run when authenticated
      keepPreviousData: true,
      retry: false,
      staleTime: tenMinutes,
    }
  );

  console.log({ playerList });

  const table = useReactTable({
    columns: userColumnDefs,
    // @ts-expect-error TODO fix this properly once DB is not mocked
    data: playerList?.content ?? [],
    // @ts-expect-error TODO fix this properly once DB is not mocked
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
                      className="flex cursor-pointer gap-4 font-ubuntuBold"
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
                  {/* @ts-expect-error TODO fix this properly once DB is not mocked */}
                  {playerList?.content[0].id === row.original.id &&
                    index === 0 &&
                    currentPage === 0 && (
                      <div className="inline-block animate-bounce text-xl sm:text-2xl">
                        👑
                      </div>
                    )}
                  {"   "}
                  {index === 0 ? (
                    <Link
                      to={`/player-history/${hyphenate(row.original.name)}`}
                      state={{
                        playerId: row.original.id,
                        playerName: row.original.name,
                        winRate: row.original.winRate,
                        gamesWon: row.original.gamesWon,
                        gamesPlayed: row.original.gamesPlayed,
                        rating: row.original.rating,
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
                  {"   "}
                  {/* @ts-expect-error TODO fix this properly once DB is not mocked */}
                  {playerList?.content[0].id === row.original.id &&
                    index === 0 &&
                    currentPage === 0 && (
                      <div className="inline-block animate-bounce text-xl sm:text-2xl">
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
        <div className="flex flex-col items-start gap-2 sm:flex-row  sm:items-center">
          <div className="btn-group flex w-full justify-between sm:w-fit sm:justify-start">
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
            <span className="ml-1 flex items-center gap-1">
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
                className="input input-bordered input-sm mx-2 w-20 focus:border-navy focus:outline-none dark:focus:border-aqua"
              />
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="select select-bordered select-sm focus:border-navy focus:outline-none dark:focus:border-aqua"
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
