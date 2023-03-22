import { getRequest } from "../../request";
import { type IGetGamesMutationParams } from "../../types";
import { type IGame } from "../types";
import { getGamesByUserIdUrl } from "../urls";

export async function getGamesByUserId({
  accessToken,
  id
}: IGetGamesMutationParams): Promise<IGame[]> {
  return await getRequest({ accessToken, url: getGamesByUserIdUrl(id) });
}
