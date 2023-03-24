import { baseURL } from "../../urls";
import { type IPlayerFindParams, type IPlayerListParams } from "./types";

export const playerList = ({
  page,
  size,
  minGamesPlayed,
}: IPlayerListParams): string =>
  minGamesPlayed != null
    ? `${baseURL}/player/list?page=${page}&size=${size}&minGamesPlayed=${minGamesPlayed}`
    : `${baseURL}/player/list?page=${page}&size=${size}`;

export const playerFind = ({ name }: IPlayerFindParams): string => {
  return `${baseURL}/player/find?name=${name}`;
};
