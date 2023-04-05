import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { fetchGamesByUserId } from "../api/game/get/queries";
import { type IGame } from "../api/game/types";
import { fiveMinutes } from "../constants/time";
import { useAuthStore, useUserStore } from "../store";
import { LoadingSpinner } from "./LoadingSpinner";

const columnHelper = createColumnHelper<IGame>();

export const GamesHistory = (): JSX.Element => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { getAuth } = useAuthStore();
  const auth = getAuth();

  const { getUser } = useUserStore();
  const currentUser = getUser();

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const { data: gameList, isLoading: isGameListLoading } = useQuery(
    [
      "gamesByUserId",
      currentUser?.id,
      fetchGamesByUserId,
      auth?.accessToken,
      pagination,
    ],
    async () =>
      await fetchGamesByUserId({
        accessToken: auth?.accessToken as string,
        id: currentUser?.id as string,
        page: pageIndex,
        size: pageSize,
      }),
    {
      enabled: auth?.accessToken != null && currentUser?.id != null,
      staleTime: fiveMinutes,
      keepPreviousData: true,
      retry: false,
    }
  );

  const userColumnDefs = [
    columnHelper.accessor(
      (row) =>
        row.playerRefB.id === currentUser?.id
          ? row.playerRefA.name
          : row.playerRefB.name,
      {
        id: "Opponent",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Opponent</span>,
      }
    ),
    columnHelper.accessor(
      (row) => row.gameResult.winnerId === currentUser?.id,
      {
        id: "result",
        cell: (info) => <span>{JSON.stringify(info.getValue())}</span>,
        header: () => <span>Result</span>,
      }
    ),
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
        row.gameResult.winnerId === currentUser?.id
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
    data: gameList?.content ?? [],
    pageCount: gameList?.pageable.totalPages,
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
      {gameList != null && gameList.content.length > 0 ? (
        <>
          <p className="text-2xl font-ubuntuBold  text-navy dark:text-aqua mb-3 ml-10">
            Game history
          </p>
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
                            {direction !== false && (
                              <span>{sortIndicator}</span>
                            )}
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
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
                          e.target.value != null
                            ? Number(e.target.value) - 1
                            : 0;
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
      ) : !isGameListLoading &&
        gameList != null &&
        gameList.content.length === 0 ? (
        <div className="card flex justify-center bg-aqua dark:bg-cloudBirst w-full sm:w-96 h-16 mt-10">
          You haven&apos;t played any games yet!
        </div>
      ) : isGameListLoading ? (
        <LoadingSpinner />
      ) : (
        <></>
      )}
    </>
  );
};
