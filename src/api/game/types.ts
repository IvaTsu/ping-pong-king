export interface IGame {
  id: string;
  playerScoreA: IPlayerScore;
  playerScoreB: IPlayerScore;
  tournamentRef: ITournamentRef;
  winnerId: string;
  playedWhen: string;
}
export interface ITournamentRef {
  id: string;
  name: string;
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
