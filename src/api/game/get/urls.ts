import { baseURL } from "../../urls";

export const gamesByUserId = (id: string, size: string): string => `${baseURL}/game/find?page=0&size=${size}&playerIds=${id}`
