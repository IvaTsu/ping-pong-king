import { useParams } from "react-router-dom";

const PlayerHistory = (): JSX.Element => {
  const params = useParams();

  return <>{JSON.stringify(params)}</>;
};

export default PlayerHistory;
