import { getRequest } from "../../request";
import { type ITournamentList } from "./types";
import { tournamentList } from "./urls";

export async function fetchTournamentList(
  accessToken: string
): Promise<ITournamentList[]> {
  return await getRequest({ accessToken, url: tournamentList() });
}
