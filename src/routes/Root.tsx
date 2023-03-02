import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { fetchPlayersList, type IPlayerData } from "../api/queries";
import NavigationBar from "../components/NavigationBar";
import ProtectedRoute from "../routes/ProtectedRoute";

const columnHelper = createColumnHelper<IPlayerData>();
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

function Root(): JSX.Element {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { data: playersList } = useQuery(["playersList"], fetchPlayersList);

  const table = useReactTable({
    columns: userColumnDefs,
    data: playersList?.content ?? [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });
  const headers = table.getFlatHeaders();
  const rows = table.getRowModel().rows;

  return (
    <ProtectedRoute>
      <>
        <NavigationBar />
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
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
                          // 8. add a class to render the sorting indicator properly
                          className="cursor-pointer flex gap-4"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {/* 9. render the sorting indicator */}
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
        </div>
      </>
    </ProtectedRoute>
  );
}

export default Root;
