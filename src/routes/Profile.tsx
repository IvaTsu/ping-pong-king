import "../App.css";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { createPlayer } from "../api/player/post/mutations";
import { type IPostPlayerBody } from "../api/player/post/types";
import { fetchTournamentList } from "../api/tournament/get/queries";
import NavigationBar from "../components/NavigationBar";
import ProtectedRoute from "../routes/ProtectedRoute";
import { useAuthStore, useUserStore } from "../store";
import { decodeJWT, type IDecodedIdToken } from "../utils/decodeJWT";

function Profile(): JSX.Element {
  const [tournamentId, setTournamentId] = useState<string>();

  const { getAuth } = useAuthStore();
  const auth = getAuth();
  const userFromIdToken = decodeJWT<IDecodedIdToken>(auth?.idToken);
  const { setUser } = useUserStore();

  const { data: tournamentList, isLoading } = useQuery(
    ["tournamentList", fetchTournamentList, auth?.accessToken],
    async () => await fetchTournamentList(auth?.accessToken as string),
    { enabled: auth?.accessToken != null }
  );

  const { mutate: createPlayerMutation } = useMutation({
    mutationFn: createPlayer,
    onSuccess: (player) => {
      setUser(player);
    },
  });

  const { getUser } = useUserStore();
  const currentUser = getUser();

  const _onTournamentChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setTournamentId(e.target.value);
  };

  const _onTournamentSubmit = (
    accessToken: string,
    body: IPostPlayerBody
  ): void => {
    createPlayerMutation({ accessToken, body });
  };

  return (
    <ProtectedRoute>
      <>
        <NavigationBar />
        <div className="App">
          {currentUser == null ? (
            <div>
              <h1>Hello, {userFromIdToken?.name}</h1>
              <p className="my-5">Assign yourself to the Office</p>

              <select
                className="mb-5 mr-5 select select-info w-full max-w-xs"
                defaultValue={"DEFAULT"}
                onChange={_onTournamentChange}
              >
                <option value={"DEFAULT"} disabled>
                  Select office
                </option>
                {tournamentList?.map((tournament) => {
                  return (
                    <option key={tournament.id} value={tournament.id}>
                      {tournament.name}
                    </option>
                  );
                })}
              </select>
              <button
                className={`btn btn-ghost ${
                  tournamentId != null
                    ? "btn-outline btn-success"
                    : "btn-disabled"
                }  ${isLoading ? "loading" : ""}`}
                onClick={() => {
                  if (
                    auth?.accessToken != null &&
                    tournamentId != null &&
                    userFromIdToken != null
                  ) {
                    _onTournamentSubmit(auth?.accessToken, {
                      name: userFromIdToken.name,
                      email: userFromIdToken.email,
                      profileImage: userFromIdToken.picture,
                      tournamentRef: {
                        id: tournamentId,
                      },
                    });
                  }
                }}
              >
                Assign
              </button>
            </div>
          ) : (
            <div className="card card-side bg-base-100 shadow-xl mt-10">
              <figure>
                <img
                  src={currentUser.profileImage}
                  alt={`Picture of ${currentUser.name}`}
                />
              </figure>
              <div className="card-body text-center">
                <p>{currentUser.name}</p>
                <p>{currentUser.email}</p>
                <p>Rating: {currentUser.rating}</p>
                <p>Games played: {currentUser.gamesPlayed}</p>
              </div>
            </div>
          )}
        </div>
      </>
    </ProtectedRoute>
  );
}

export default Profile;
