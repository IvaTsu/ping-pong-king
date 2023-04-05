import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useLocation } from "react-router-dom";

import { fetchGamesByUserId } from "../api/game/get/queries";
import { type IGame } from "../api/game/types";
import NavigationBar from "../components/NavigationBar";
import { fiveMinutes } from "../constants/time";
import { useTablePagination } from "../hooks/useTablePagination";
import { useAuthStore } from "../store";

const columnHelper = createColumnHelper<IGame>();

const PlayerHistory = (): JSX.Element => {
  const {
    sorting,
    setSorting,
    pagination,
    setPagination,
    pageIndex,
    pageSize,
  } = useTablePagination();

  const location = useLocation();
  const { playerId, playerName } = location.state;

  const { getAuth } = useAuthStore();
  const auth = getAuth();

  const { data: games } = useQuery(
    ["playerHistory", playerId, pagination],
    async () =>
      await fetchGamesByUserId({
        accessToken: auth?.accessToken as string,
        id: playerId,
        page: pageIndex,
        size: pageSize,
      }),
    {
      enabled: auth?.accessToken != null,
      staleTime: fiveMinutes,
      keepPreviousData: true,
      retry: false,
    }
  );

  const userColumnDefs = [
    columnHelper.accessor(
      (row) =>
        row.playerRefB.id === playerId
          ? row.playerRefA.name
          : row.playerRefB.name,
      {
        id: "Opponent",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Opponent</span>,
      }
    ),
    columnHelper.accessor((row) => row.gameResult.winnerId === playerId, {
      id: "result",
      cell: (info) => <span>{JSON.stringify(info.getValue())}</span>,
      header: () => <span>Result</span>,
    }),
    columnHelper.accessor(
      (row) =>
        `${row.gameResult.playerAScore} : ${row.gameResult.playerBScore}`,
      {
        id: "score",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Score</span>,
      }
    ),
    columnHelper.accessor(
      (row) =>
        row.gameResult.winnerId === playerId
          ? Math.max(
              row.gameResult.playerARatingAlteration,
              row.gameResult.playerBRatingAlteration
            )
          : Math.min(
              row.gameResult.playerARatingAlteration,
              row.gameResult.playerBRatingAlteration
            ),
      {
        id: "gainOrLoss",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Gain / Loss</span>,
      }
    ),
    columnHelper.accessor(
      (row) => new Date(row.playedWhen).toISOString().split("T")[0],
      {
        id: "date",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Date</span>,
      }
    ),
  ];

  const table = useReactTable({
    columns: userColumnDefs,
    data: games?.content ?? [],
    pageCount: games?.pageable.totalPages,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    manualPagination: true,
  });

  const headers = table.getFlatHeaders();
  const rows = table.getRowModel().rows;
  const currentPage = table.getState().pagination.pageIndex;

  return (
    <>
      <NavigationBar />
      <p>{playerName} Games History</p>
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
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
    </>
  );
};

export default PlayerHistory;
