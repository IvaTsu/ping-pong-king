import { postRequest } from "../../request";
import { type ICreateGameParams, type IGame } from "./types";
import { gameCreate } from "./urls";

export async function createGame({
  accessToken,
  body,
}: ICreateGameParams): Promise<IGame> {
  return await postRequest({ accessToken, body, url: gameCreate() });
}
