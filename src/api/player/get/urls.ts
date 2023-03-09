import { baseURL } from "../../urls";
import { type IPlayerFindParams, type IPlayerListParams } from "./types";

export const playerList = ({ page, size }: IPlayerListParams): string =>
  `${baseURL}/player/list?page=${page}&size=${size}`;

export const playerFind = ({
  name,
  tournamentId,
}: IPlayerFindParams): string => {
  return tournamentId != null
    ? `${baseURL}/player/find?name=${name}&tournamentId=${tournamentId}`
    : `${baseURL}/player/find?name=${name}`;
};
