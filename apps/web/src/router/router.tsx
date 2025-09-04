import { createBrowserRouter } from "react-router-dom";

import ApiTest from "../components/ApiTest";
import AddGame from "../routes/AddGame";
import Login from "../routes/Login";
import NotFound from "../routes/NotFound";
import PlayerHistory from "../routes/PlayerHistory";
import Profile from "../routes/Profile";
import ProtectedRoute from "../routes/ProtectedRoute";
import Root from "../routes/Root";

export const paths = Object.freeze({
  root: "/",
  login: "/login",
  profile: "/profile",
  addGame: "/add-game",
  playerHistory: "/player-history/:playerName",
  apiTest: "/api-test",
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
  {
    path: paths.apiTest,
    element: (
      <ProtectedRoute>
        <ApiTest />
      </ProtectedRoute>
    ),
  },
]);

export default router;
