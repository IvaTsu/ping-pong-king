import { useQuery } from "@tanstack/react-query";

import { fetchPlayersList } from "../api/queries";
import NavigationBar from "../components/NavigationBar";
import ProtectedRoute from "../routes/ProtectedRoute";

function Root(): JSX.Element {
  const { data: playersList } = useQuery(["playersList"], fetchPlayersList);

  return (
    <ProtectedRoute>
      <>
        <NavigationBar />
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Rating</th>
                <th>Office</th>
                <th>Games played</th>
              </tr>
            </thead>
            <tbody>
              {playersList?.content.map((player, index) => {
                return (
                  <tr key={player.id} className="hover">
                    <th>{index + 1}</th>
                    <td>{player.name}</td>
                    <td>{player.rating}</td>
                    <td>{player.tournamentRef.name}</td>
                    <td>{player.gamesPlayed}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    </ProtectedRoute>
  );
}

export default Root;
