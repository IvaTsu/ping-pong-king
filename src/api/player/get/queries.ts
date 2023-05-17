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
  tournamentId,
  minGamesPlayed,
}: IPlayerListParams): Promise<IPlayerList> {
  return await getRequest({
    url: playerList({ page, size, tournamentId, minGamesPlayed }),
  });
}

export async function fetchPlayer({
  name,
}: IPlayerFindParams): Promise<IPlayer[]> {
  return await getRequest({
    url: playerFind({ name }),
  });
}
