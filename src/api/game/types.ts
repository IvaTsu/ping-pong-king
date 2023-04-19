export interface IGame {
  id: string;
  playerScoreA: PlayerScore;
  playerScoreB: PlayerScore;
  tournamentRef: TournamentRef;
  winnerId: string;
  playedWhen: string;
}

// TODO: check if the below types can be reused and come up with the naming convention
interface TournamentRef {
  id: string;
  name: string;
}

interface PlayerScore {
  playerRef: PlayerRef;
  score: number;
  ratingAlteration: number;
}

interface PlayerRef {
  id: string;
  name: string;
  rating: number;
}
