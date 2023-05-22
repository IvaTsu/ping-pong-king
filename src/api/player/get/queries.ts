import { getRequest } from "../../request";
import {
  type IPlayer,
  type IPlayerFindParams,
  type IPlayerList,
  type IPlayerListParams,
} from "./types";
import { playerFind, playerList } from "./urls";

export async function fetchPlayerList({
  page,
  size,
  locationId,
  minGamesPlayed,
}: IPlayerListParams): Promise<IPlayerList> {
  return await getRequest({
    url: playerList({ page, size, locationId, minGamesPlayed }),
  });
}

export async function fetchPlayer({
  name,
  locationId,
}: IPlayerFindParams): Promise<IPlayer[]> {
  return await getRequest({
    url: playerFind({ name, locationId }),
  });
}
