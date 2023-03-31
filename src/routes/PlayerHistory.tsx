import { useLocation, useParams } from "react-router-dom";

const PlayerHistory = (): JSX.Element => {
  const location = useLocation();
  const params = useParams();

  const { playerId } = location.state;
  const { playerName } = params;

  return (
    <>
      <p>{playerId}</p>
      <p>{playerName}</p>
    </>
  );
};

export default PlayerHistory;
