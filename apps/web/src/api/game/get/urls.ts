import { baseURL } from "../../urls";
import { type IGamesByUserIdParams } from "./types";

export const gamesByUserId = ({
  id,
  page,
  size,
}: IGamesByUserIdParams): string =>
  `${baseURL}/game/find?page=${page}&size=${size}&playerIds=${id}`;
