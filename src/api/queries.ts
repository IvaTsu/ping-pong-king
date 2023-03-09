import {
  type IPlayerFindParams,
  type IPlayerListParams,
  playerCreate,
  playerFind,
  playersList,
  tournamentList,
} from "./urls";

interface IGetRequestParams {
  accessToken: string;
  url: string;
}

async function getRequest<T>({
  accessToken,
  url,
}: IGetRequestParams): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return await response.json();
}

interface IPostRequestParams extends IGetRequestParams {
  body: object;
}

async function postRequest<T>({
  accessToken,
  body,
  url,
}: IPostRequestParams): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
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
  accessToken,
  page,
  size,
}: IPlayerListParams & { accessToken: string }): Promise<IPlayersList> {
  return await getRequest({ accessToken, url: playersList({ page, size }) });
}

export interface IPlayer {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  tournamentRef: {
    id: string;
    name: string;
  };
  rating: number;
  registeredWhen: string;
  gamesPlayed: number;
}

export async function fetchPlayer({
  accessToken,
  name,
  tournamentId,
}: IPlayerFindParams & { accessToken: string }): Promise<IPlayer[]> {
  return await getRequest({
    accessToken,
    url: playerFind({ name, tournamentId }),
  });
}

export interface ITournamentList {
  id: string;
  name: string;
}

export async function fetchTournamentList(
  accessToken: string
): Promise<ITournamentList[]> {
  return await getRequest({ accessToken, url: tournamentList() });
}

interface ICreatePlayerParams {
  accessToken: string;
  body: object;
}

export async function createPlayer({
  accessToken,
  body,
}: ICreatePlayerParams): Promise<IPlayer> {
  return await postRequest({ accessToken, body, url: playerCreate() });
}
