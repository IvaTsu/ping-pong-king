interface PlayerRef {
  id: string;
}
interface PlayerScore {
  playerRef: PlayerRef;
  score: number;
}

export interface IPostGameBody {
  playerScoreA: PlayerScore;
  playerScoreB: PlayerScore;
  tournamentRef: PlayerRef;
}
