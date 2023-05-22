import { getRequest } from "../../request";
import { baseURL } from "../../urls";
import {
  type IPlayer,
  type IPlayerFindParams,
  type IPlayerList,
  type IPlayerListParams,
} from "./types";

export async function fetchPlayerList({
  page,
  size,
  locationId,
  minGamesPlayed,
}: IPlayerListParams): Promise<IPlayerList> {
  return await getRequest({
    url: `${baseURL}/player/list`,
    params: {
      page,
      size,
      locationId,
      minGamesPlayed,
    },
  });
}

export async function fetchPlayer({
  name,
  locationId,
}: IPlayerFindParams): Promise<IPlayer[]> {
  return await getRequest({
    url: `${baseURL}/player/find`,
    params: {
      name,
      locationId,
    },
  });
}
