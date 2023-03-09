export interface IPlayerListParams {
  page: number;
  size: number;
}

export interface IPlayerFindParams {
  name: string;
  tournamentId?: string;
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

export interface IPlayerList {
  content: IPlayer[];
  pageable: {
    last: boolean;
    numberOfElements: number;
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  };
}
