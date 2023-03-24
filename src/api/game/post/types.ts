

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

