import { getRequest } from "../../request";
import { gamesByUserId } from "../get/urls";
import { type IGame } from "../types";

export async function fetchGamesByUserId(
  accessToken: string,
  id: string,
  size: string,
): Promise<{content: IGame[]}> {
  return await getRequest({ accessToken, url: gamesByUserId(id, size) });
}
