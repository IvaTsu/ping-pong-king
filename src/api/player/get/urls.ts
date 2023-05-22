import { baseURL } from "../../urls";
import { type IPlayerFindParams, type IPlayerListParams } from "./types";

export const playerList = ({
  page,
  size,
  locationId,
  minGamesPlayed,
}: IPlayerListParams): string => {
  if (minGamesPlayed != null && locationId != null) {
    return `${baseURL}/player/list?page=${page}&size=${size}&locationId=${locationId}&minGamesPlayed=${minGamesPlayed}`;
  }
  if (minGamesPlayed != null) {
    return `${baseURL}/player/list?page=${page}&size=${size}&minGamesPlayed=${minGamesPlayed}`;
  }
  if (locationId != null) {
    return `${baseURL}/player/list?page=${page}&size=${size}&locationId=${locationId}`;
  }
  return `${baseURL}/player/list?page=${page}&size=${size}`;
};

export const playerFind = ({ name, locationId }: IPlayerFindParams): string => {
  if (locationId != null) {
    return `${baseURL}/player/find?name=${name}&locationId=${locationId}`;
  }
  return `${baseURL}/player/find?name=${name}`;
};
