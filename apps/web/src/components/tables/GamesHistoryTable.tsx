import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { fetchGamesByUserId } from "../../api/game/get/queries";
import { type IGame } from "../../api/game/types";
import { fiveMinutes } from "../../constants/time";
import { useTablePagination } from "../../hooks/useTablePagination";
import { useUserStore } from "../../store";
import { ReactComponent as CheckSvg } from "../../svg/check.svg";
import { ReactComponent as DeniedSvg } from "../../svg/denied.svg";
import getRandomEmoji from "../../utils/getRandomEmoji";
import { LoadingSpinner } from "../LoadingSpinner";

const columnHelper = createColumnHelper<IGame>();

const GamesHistoryTable = ({
  playerId,
  playerName,
}: {
  playerId: string;
  playerName: string;
}): JSX.Element => {
  const {
    sorting,
    setSorting,
    pagination,
    setPagination,
    pageIndex,
    pageSize,
  } = useTablePagination();

  const { getUser } = useUserStore();
  const currentUser = getUser();

  const { data: games, isLoading: isGamesLoading } = useQuery(
    ["playerHistory", playerId, pagination],
    async () =>
      await fetchGamesByUserId({
        id: playerId,
        page: pageIndex,
        size: pageSize,
      }),
    {
      staleTime: fiveMinutes,
      keepPreviousData: true,
      retry: false,
    },
  );

  const userColumnDefs = [
    columnHelper.accessor(
      (row) =>
        row.playerScoreB.playerRef.id === playerId
          ? row.playerScoreA.playerRef.name
          : row.playerScoreB.playerRef.name,
      {
        id: "Opponent",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Opponent</span>,
      },
    ),
    columnHelper.accessor((row) => row.winnerId === playerId, {
      id: "result",
      cell: (info) => (
        <>
          {info.getValue() ? (
            <CheckSvg color="#539165" width={18} height={18} />
          ) : (
            <DeniedSvg color="#E11D48" width={18} height={18} />
          )}
        </>
      ),
      header: () => <span>Result</span>,
    }),
    columnHelper.accessor(
      (row) =>
        playerId === row.playerScoreA.playerRef.id
          ? `${row.playerScoreA.score} : ${row.playerScoreB.score}`
          : `${row.playerScoreB.score} : ${row.playerScoreA.score}`,
      {
        id: "score",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Score</span>,
      },
    ),
    columnHelper.accessor(
      (row) =>
        row.winnerId === playerId
          ? Math.max(
              row.playerScoreA.ratingAlteration,
              row.playerScoreB.ratingAlteration,
            )
          : Math.min(
              row.playerScoreA.ratingAlteration,
              row.playerScoreB.ratingAlteration,
            ),
      {
        id: "gainOrLoss",
        cell: (info) => (
          <>
            {isNaN(info.getValue()) ? (
              <span aria-hidden="true" role="img">
                {getRandomEmoji()}
              </span>
            ) : info.getValue() > 0 ? (
              <span className="text-middleGreen">{info.getValue()}</span>
            ) : (
              <span className="text-rose">{info.getValue()}</span>
            )}
          </>
        ),
        header: () => <span>Gain / Loss</span>,
      },
    ),
    columnHelper.accessor(
      (row) => new Date(row.playedWhen).toISOString().split("T")[0],
      {
        id: "date",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Date</span>,
      },
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
      {isGamesLoading && <LoadingSpinner />}
      {!isGamesLoading &&
        games != null &&
        (games.content.length > 0 ? (
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
                              header.getContext(),
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
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="my-2">
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
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
                          e.target.value != null
                            ? Number(e.target.value) - 1
                            : 0;
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
        ) : (
          <div className="flex justify-center">
            <div className="card mt-10 flex h-16 w-full justify-center bg-aqua sm:w-96 dark:bg-cloudBirst">
              {currentUser?.id === playerId ? (
                <>You haven&apos;t</>
              ) : (
                <>{playerName} hasn&apos;t</>
              )}{" "}
              played any games yet!
            </div>
          </div>
        ))}
    </>
  );
};

export default GamesHistoryTable;
