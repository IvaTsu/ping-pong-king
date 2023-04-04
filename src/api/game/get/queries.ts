import { getRequest } from "../../request";
import { gamesByUserId } from "../get/urls";
import { type IGamesByUserId, type IGamesByUserIdParams } from "./types";

interface IFetchGamesByUserIdParams extends IGamesByUserIdParams {
  accessToken: string;
}

export async function fetchGamesByUserId({
  accessToken,
  id,
  page,
  size,
}: IFetchGamesByUserIdParams): Promise<IGamesByUserId> {
  return await getRequest({
    accessToken,
    url: gamesByUserId({ id, page, size }),
  });
}
