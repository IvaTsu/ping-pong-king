import { postRequest } from "../../request";
import { type ICreateMutationParams } from "../../types";
import { type IPlayer } from "../get/types";
import { type IPostPlayerBody } from "./types";
import { playerCreate } from "./urls";

export async function createPlayer({
  body,
}: ICreateMutationParams<IPostPlayerBody>): Promise<IPlayer> {
  return await postRequest({ body, url: playerCreate() });
}
