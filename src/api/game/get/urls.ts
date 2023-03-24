import { baseURL } from "../../urls";

export const gamesByUserIdUrl = (id: string): string => `${baseURL}/game/find?page=0&size=40&playerIds=${id}`
