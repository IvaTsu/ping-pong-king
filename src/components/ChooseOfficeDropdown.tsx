import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { fetchLocationList } from "../api/location/get/queries";
import { useOfficeStore, useUserStore } from "../store";
import { LoadingSpinner } from "./LoadingSpinner";

export const ChooseOfficeDropdown = (): JSX.Element => {
  const { getUser } = useUserStore();
  const currentUser = getUser();

  const { setOfficeId } = useOfficeStore();

  const { data: locationList, isLoading: isLocationListLoading } = useQuery(
    ["locationList", fetchLocationList],
    async () => await fetchLocationList()
  );

  const sortedLocationList = useMemo(() => {
    if (locationList != null) {
      return [
        ...locationList?.filter((x) => x.id === currentUser?.locationRef.id),
        ...locationList?.filter((x) => x.id !== currentUser?.locationRef.id),
      ];
    } else {
      return locationList;
    }
  }, [locationList]);

  const _onLocationChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setOfficeId(e.target.value);
  };

  return isLocationListLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <div className="indicator mt-10">
        <span className="indicator-item badge badge-accent">Office</span>
        <select
          className="select select-info w-full max-w-xs"
          onChange={_onLocationChange}
        >
          {sortedLocationList?.map((location) => {
            return (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};
