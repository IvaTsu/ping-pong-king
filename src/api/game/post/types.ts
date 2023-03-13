export interface IGame {
  id: string;
  playerRefA: {
    id: string;
    name: string;
    rating: number;
  };
  playerRefB: {
    id: string;
    name: string;
    rating: number;
  };
  tournamentRef: {
    id: string;
    name: string;
  };
  gameResult: {
    playerAScore: number;
    playerBScore: number;
    winnerId: string;
  };
  playedWhen: string;
}

export interface ICreateGameParams {
  accessToken: string;
  body: object;
}
