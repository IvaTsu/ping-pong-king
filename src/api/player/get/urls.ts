import { baseURL } from "../../urls";
import { type IPlayerFindParams, type IPlayerListParams } from "./types";

export const playerList = ({
  page,
  size,
  tournamentId,
  minGamesPlayed,
}: IPlayerListParams): string => {
  if (minGamesPlayed != null && tournamentId != null) {
    return `${baseURL}/player/list?page=${page}&size=${size}&tournamentId=${tournamentId}&minGamesPlayed=${minGamesPlayed}`;
  }
  if (minGamesPlayed != null) {
    return `${baseURL}/player/list?page=${page}&size=${size}&minGamesPlayed=${minGamesPlayed}`;
  }
  if (tournamentId != null) {
    return `${baseURL}/player/list?page=${page}&size=${size}&tournamentId=${tournamentId}`;
  }
  return `${baseURL}/player/list?page=${page}&size=${size}`;
};

export const playerFind = ({ name }: IPlayerFindParams): string => {
  return `${baseURL}/player/find?name=${name}`;
};
