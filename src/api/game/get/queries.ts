import { getRequest } from "../../request";
import { gamesByUserIdUrl } from "../get/urls";
import { type IGame } from "../types";

export async function fetchGamesByUserId(
  accessToken: string,
  id: string
): Promise<{content: IGame[]}> {
  return await getRequest({ accessToken, url: gamesByUserIdUrl(id) });
}
