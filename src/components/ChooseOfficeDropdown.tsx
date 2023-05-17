import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { fetchTournamentList } from "../api/tournament/get/queries";
import { useOfficeStore, useUserStore } from "../store";
import { LoadingSpinner } from "./LoadingSpinner";

export const ChooseOfficeDropdown = (): JSX.Element => {
  const { getUser } = useUserStore();
  const currentUser = getUser();

  const { setOfficeId } = useOfficeStore();

  const { data: tournamentList, isLoading: isTournamentListLoading } = useQuery(
    ["tournamentList", fetchTournamentList],
    async () => await fetchTournamentList()
  );

  const sortedTournamentList = useMemo(() => {
    if (tournamentList != null) {
      return [
        ...tournamentList?.filter(
          (x) => x.id === currentUser?.tournamentRef.id
        ),
        ...tournamentList?.filter(
          (x) => x.id !== currentUser?.tournamentRef.id
        ),
      ];
    } else {
      return tournamentList;
    }
  }, [tournamentList]);

  const _onTournamentChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setOfficeId(e.target.value);
  };

  return isTournamentListLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <div className="indicator mt-10">
        <span className="indicator-item badge badge-accent">Office</span>
        <select
          className="select select-info w-full max-w-xs"
          onChange={_onTournamentChange}
        >
          {sortedTournamentList?.map((tournament) => {
            return (
              <option key={tournament.id} value={tournament.id}>
                {tournament.name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};
