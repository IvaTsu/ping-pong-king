export interface IGame {
  id: string;
  playerScoreA: IPlayerScore;
  playerScoreB: IPlayerScore;
  winnerId: string;
  playedWhen: string;
}

export interface IPlayerScore {
  playerRef: IPlayerRef;
  score: number;
  ratingAlteration: number;
}

export interface IPlayerRef {
  id: string;
  name: string;
  rating: number;
}
