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

export interface IPostGameBody {
  playerRefA: {
    id: string;
  };
  playerRefB: {
    id: string;
  };
  // TODO: this should be a separate selector
  tournamentRef: {
    id: string;
  };
  gameResult: {
    playerAScore: number;
    playerBScore: number;
    winnerId: string;
  };
}
