import { baseURL } from "../urls";

export const gameCreate = (): string => `${baseURL}/game/create`;
export const getGamesByUserIdUrl = (id: string): string => `${baseURL}/game/find?page=0&size=40&playerIds=${id}`
