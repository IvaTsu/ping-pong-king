import { createBrowserRouter } from "react-router-dom";

import AddGame from "../routes/AddGame";
import Login from "../routes/Login";
import NotFound from "../routes/NotFound";
import PlayerHistory from "../routes/PlayerHistory";
import Profile from "../routes/Profile";
import Root from "../routes/Root";

export const paths = Object.freeze({
  root: "/",
  login: "/login",
  profile: "/profile",
  addGame: "/add-game",
  playerHistory: "/player-history/:playerName",
});

const router = createBrowserRouter([
  {
    path: paths.root,
    element: <Root />,
    errorElement: <NotFound />,
  },
  {
    path: paths.login,
    element: <Login />,
  },
  {
    path: paths.profile,
    element: <Profile />,
  },
  {
    path: paths.addGame,
    element: <AddGame />,
  },
  {
    path: paths.playerHistory,
    element: <PlayerHistory />,
  },
]);

export default router;
