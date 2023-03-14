import { postRequest } from "../../request";
import { type ICreateMutationParams } from "../../types";
import { type IPlayer } from "../get/types";
import { type IPostPlayerBody } from "./types";
import { playerCreate } from "./urls";

export async function createPlayer({
  accessToken,
  body,
}: ICreateMutationParams<IPostPlayerBody>): Promise<IPlayer> {
  return await postRequest({ accessToken, body, url: playerCreate() });
}
