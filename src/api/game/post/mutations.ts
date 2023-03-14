import { postRequest } from "../../request";
import { type ICreateMutationParams } from "../../types";
import { type IGame, type IPostGameBody } from "./types";
import { gameCreate } from "./urls";

export async function createGame({
  accessToken,
  body,
}: ICreateMutationParams<IPostGameBody>): Promise<IGame> {
  return await postRequest({ accessToken, body, url: gameCreate() });
}
