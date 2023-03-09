import { postRequest } from "../../request";
import { type IPlayer } from "../get/types";
import { type ICreatePlayerParams } from "./types";
import { playerCreate } from "./urls";

export async function createPlayer({
  accessToken,
  body,
}: ICreatePlayerParams): Promise<IPlayer> {
  return await postRequest({ accessToken, body, url: playerCreate() });
}
