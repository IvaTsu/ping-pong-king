import { getRequest } from "../../request";
import { type ITournamentList } from "./types";
import { tournamentList } from "./urls";

export async function fetchTournamentList(): Promise<ITournamentList[]> {
  return await getRequest({ url: tournamentList() });
}
