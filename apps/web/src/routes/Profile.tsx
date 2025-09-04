import "../App.css";

import NavigationBar from "../components/NavigationBar";
import GamesHistoryTable from "../components/tables/GamesHistoryTable";
import { WinRate } from "../components/WinRate";
import ProtectedRoute from "../routes/ProtectedRoute";
import { useUserStore } from "../store";

function Profile(): JSX.Element | null {
  const { getUser } = useUserStore();
  const currentUser = getUser();

  if (currentUser == null) return null;

  return (
    <ProtectedRoute>
      <>
        <NavigationBar />
        <>
          <div className="mt-10 flex w-full flex-col items-center border-lightGrey">
            <div className="card card-side relative mt-10 flex w-full items-center bg-base-100 p-3 shadow-xl sm:w-96 sm:p-5">
              <div className="absolute right-2 top-4">
                <WinRate value={currentUser?.winRate} />
              </div>
              <figure className="rounded-none">
                <img
                  src={currentUser?.profileImage}
                  alt={`Picture of ${currentUser?.name}`}
                  className="rounded-md border-2 border-darkGrey"
                />
              </figure>
              <div className="pl-5 text-start">
                <p className="text-l pb-2 font-ubuntuRegular text-navy sm:text-xl dark:text-aqua">
                  {currentUser?.name}
                </p>
                <p>{currentUser?.email}</p>
                <p>Rating: {currentUser?.rating}</p>
                <p>
                  Won {currentUser?.gamesWon} games out of{" "}
                  {currentUser?.gamesPlayed}{" "}
                </p>
              </div>
            </div>
          </div>
          {currentUser?.id != null && currentUser?.name != null && (
            <GamesHistoryTable
              playerId={currentUser?.id}
              playerName={currentUser?.name}
            />
          )}
        </>
      </>
    </ProtectedRoute>
  );
}

export default Profile;
