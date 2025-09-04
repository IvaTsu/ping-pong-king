import { type IPlayer } from "../api/player/get/types";
import { ChooseOpponentsDropdown } from "./ChooseOpponentDropdown";

export const ScoreInput = ({
  user,
  setUserScore,
  value,
  isInvalid,
  playersList,
}: {
  user: IPlayer | null;
  setUserScore: (value: number | "") => void;
  value: number | "";
  isInvalid: boolean;
  playersList?: IPlayer[];
}): JSX.Element => {
  const _onUserScoreChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === "") setUserScore("");
    else setUserScore(Number.parseInt(e.target.value, 10));
  };
  const borderColor = isInvalid ? "border-rose" : " ";
  return (
    <div>
      <label className="label">
        <span className="label-text relative">
          {user != null ? (
            <ChooseOpponentsDropdown
              playersList={playersList}
              userName={user?.name}
            />
          ) : (
            "Your Score"
          )}
        </span>
      </label>
      <label className="input-group">
        <span>Score</span>
        <input
          value={value}
          type="number"
          placeholder="Insert score number"
          className={`input input-bordered ${borderColor} focus:border-navy focus:outline-none dark:focus:border-aqua`}
          onChange={(e) => {
            _onUserScoreChange(e);
          }}
          min="0"
        />
      </label>
    </div>
  );
};
