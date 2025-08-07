import "../App.css";

import NavigationBar from "../components/NavigationBar";
import GamesHistoryTable from "../components/tables/GamesHistoryTable";
import { WinRate } from "../components/WinRate";
import ProtectedRoute from "../routes/ProtectedRoute";
import { useUserStore } from "../store";

function Profile(): JSX.Element {
  const { getUser } = useUserStore();
  const currentUser = getUser();

  return (
    <ProtectedRoute>
      <>
        <NavigationBar />
        <>
          <div className="border-lightGrey mt-10 flex w-full flex-col items-center">
            <div className="card card-side bg-base-100 relative mt-10 flex w-full items-center p-3 shadow-xl sm:w-96 sm:p-5">
              <div className="absolute top-4 right-2">
                <WinRate value={currentUser?.winRate} />
              </div>
              <figure className="rounded-none">
                <img
                  src={currentUser?.profileImage}
                  alt={`Picture of ${currentUser?.name}`}
                  className="border-darkGrey rounded-md border-2"
                />
              </figure>
              <div className="pl-5 text-start">
                <p className="text-navy dark:text-aqua font-ubuntuRegular text-l pb-2 sm:text-xl">
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
          {currentUser?.id && currentUser?.name && (
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
