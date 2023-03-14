import { type Dispatch, type SetStateAction } from 'react';

import { type IPlayer } from '../api/player/get/types';

export const ScoreInput = ({
  user,
  setUserScore,
  value
}: {
  user: IPlayer | undefined;
  setUserScore: Dispatch<SetStateAction<number | ''>>;
  value: number | '';
}): JSX.Element => {
  const _onUserScoreChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === '') setUserScore('');
    else setUserScore(Number.parseInt(e.target.value, 10));
  };
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
          className="input input-bordered"
          onChange={(e) => {
            _onUserScoreChange(e);
          }}
        />
      </label>
    </div>
  );
};
