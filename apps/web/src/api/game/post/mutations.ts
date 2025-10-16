import { postRequest } from "../../request";
import { type ICreateMutationParams } from "../../types";
import { type IGame } from "../types";
import { type IPostGameBody } from "./types";
import { gameCreate, userCreate } from "./urls";

export async function createGame({
  body,
}: ICreateMutationParams<IPostGameBody>): Promise<IGame> {
  return await postRequest({ body, url: gameCreate() });
}

export async function createUser({
  body,
}: ICreateMutationParams<{ email: string; sub: string }>): Promise<{
  email: string;
  sub: string;
}> {
  return await postRequest({ body, url: userCreate() });
}
