import { type IPlayer } from "../api/player/get/types";

export const ScoreInput = ({
  user,
  setUserScore,
  value,
  isInvalid,
}: {
  user: IPlayer | undefined;
  setUserScore: (value: number | "") => void;
  value: number | "";
  isInvalid: boolean;
}): JSX.Element => {
  const _onUserScoreChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === "") setUserScore("");
    else setUserScore(Number.parseInt(e.target.value, 10));
  };
  const borderColor = isInvalid ? "border-rose" : " ";
  return (
    <div>
      <label className="label">
        <span className="label-text">{user?.name}&apos;s Score</span>
      </label>
      <label className="input-group">
        <span>Score</span>
        <input
          value={value}
          type="number"
          placeholder="11"
          className={`input input-bordered ${borderColor} focus:outline-none dark:focus:border-aqua focus:border-navy`}
          onChange={(e) => {
            _onUserScoreChange(e);
          }}
          min="0"
        />
      </label>
    </div>
  );
};
