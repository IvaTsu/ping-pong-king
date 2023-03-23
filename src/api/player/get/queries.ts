import { getRequest } from "../../request";
import {
  type IPlayer,
  type IPlayerFindParams,
  type IPlayerList,
  type IPlayerListParams,
} from "./types";
import { playerFind, playerList } from "./urls";



export async function fetchPlayerList({
  accessToken,
  page,
  size,
}: IPlayerListParams & { accessToken: string }): Promise<IPlayerList> {
  return await getRequest({ accessToken, url: playerList({ page, size }) });
}

export async function fetchPlayer({
  accessToken,
  name,
  tournamentId,
}: IPlayerFindParams & { accessToken: string }): Promise<IPlayer[]> {
  return await getRequest({
    accessToken,
    url: playerFind({ name, tournamentId }),
  });
}
