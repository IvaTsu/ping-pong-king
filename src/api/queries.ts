import { type IPlayerListParams, playersList } from "./urls";

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export interface IPlayerData {
  gamesPlayed: number;
  id: string;
  name: string;
  rating: number;
  registeredWhen: string;
  tournamentRef: {
    id: string;
    name: string;
  };
}

interface IPlayersList {
  content: IPlayerData[];
  pageable: {
    last: boolean;
    numberOfElements: number;
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  };
}

export async function fetchPlayersList({
  page,
  size,
}: IPlayerListParams): Promise<IPlayersList> {
  return await request(playersList({ page, size }));
}
