import { postRequest } from "../../request";
import { type ICreateMutationParams } from "../../types";
import { type IGame } from "../types";
import { type IPostGameBody } from "./types";
import { gameCreate } from "./urls";

export async function createGame({
  body,
}: ICreateMutationParams<IPostGameBody>): Promise<IGame> {
  return await postRequest({ body, url: gameCreate() });
}
