import "../App.css";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { fetchLocationList } from "../api/location/get/queries";
import { createPlayer } from "../api/player/post/mutations";
import { type IPostPlayerBody } from "../api/player/post/types";
import NavigationBar from "../components/NavigationBar";
import GamesHistoryTable from "../components/tables/GamesHistoryTable";
import { WinRate } from "../components/WinRate";
import ProtectedRoute from "../routes/ProtectedRoute";
import { useAuthStore, useUserStore } from "../store";
import { decodeJWT, type IDecodedIdToken } from "../utils/decodeJWT";
import { useAuth0 } from "@auth0/auth0-react";

function Profile(): JSX.Element {
  const [locationId, setLocationId] = useState<string>();
  const { getAuth } = useAuthStore();
  const auth = getAuth();
  const userFromIdToken = decodeJWT<IDecodedIdToken>(auth?.idToken);
  const { setUser } = useUserStore();

  const { user } = useAuth0();

  const { data: locationList, isLoading: isLocationListLoading } = useQuery(
    ["locationList", fetchLocationList],
    async () => await fetchLocationList()
  );

  const { mutate: createPlayerMutation } = useMutation({
    mutationFn: createPlayer,
    onSuccess: (player) => {
      setUser(player);
    },
  });

  const { getUser } = useUserStore();
  const currentUser = getUser();

  const _onLocationChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setLocationId(e.target.value);
  };

  const _onLocationSubmit = (body: IPostPlayerBody): void => {
    createPlayerMutation({ body });
  };

  return (
    <ProtectedRoute>
      <>
        <NavigationBar />
        {user == null ? (
          <div>
            <h1>Hello, {userFromIdToken?.name}</h1>
            <p className="my-5">Assign yourself to the Office</p>

            <select
              className="select select-info mb-5 mr-5 w-full max-w-xs"
              defaultValue={"DEFAULT"}
              onChange={_onLocationChange}
            >
              <option value={"DEFAULT"} disabled>
                Select office
              </option>
              {locationList?.map((location) => {
                return (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                );
              })}
            </select>
            <button
              className={`btn btn-ghost ${
                locationId != null ? "btn-outline btn-success" : "btn-disabled"
              }  ${isLocationListLoading ? "loading" : ""}`}
              onClick={() => {
                if (locationId != null && userFromIdToken != null) {
                  _onLocationSubmit({
                    name: userFromIdToken.name,
                    email: userFromIdToken.email,
                    profileImage: userFromIdToken.picture,
                  });
                }
              }}
            >
              Assign
            </button>
          </div>
        ) : (
          <>
            <div className="border-lightGrey mt-10 flex w-full flex-col items-center">
              <div className="card card-side bg-base-100 relative mt-10 flex w-full items-center p-3 shadow-xl sm:w-96 sm:p-5">
                <div className="absolute top-4 right-2">
                  <WinRate value={user.winRate} />
                </div>
                <figure className="rounded-none">
                  <img
                    src={user.profileImage}
                    alt={`Picture of ${user.name}`}
                    className="border-darkGrey rounded-md border-2"
                  />
                </figure>
                <div className="pl-5 text-start">
                  <p className="text-navy dark:text-aqua font-ubuntuRegular text-l pb-2 sm:text-xl">
                    {user.name}
                  </p>
                  <p>{user.email}</p>
                  <p>Rating: {user.rating}</p>
                  <p>
                    Won {user.gamesWon} games out of{" "}
                    {user.gamesPlayed}{" "}
                  </p>
                </div>
              </div>
            </div>
            <GamesHistoryTable
              playerId={user.id}
              playerName={user.name as string}
            />
          </>
        )}
      </>
    </ProtectedRoute>
  );
}

export default Profile;
