import { getRequest } from "../../request";
import { gamesByUserId } from "../get/urls";
import { type IGamesByUserId, type IGamesByUserIdParams } from "./types";

export async function fetchGamesByUserId({
  id,
  page,
  size,
}: IGamesByUserIdParams): Promise<IGamesByUserId> {
  return await getRequest({
    url: gamesByUserId({ id, page, size }),
  });
}
