import { playersList } from "./urls";

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

interface IPlayerData {
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

export async function fetchPlayersList(): Promise<IPlayersList> {
  return await request(playersList);
}
