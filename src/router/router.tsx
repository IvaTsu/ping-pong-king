import { createBrowserRouter } from "react-router-dom";

import Login from "../routes/Login";
import NotFound from "../routes/NotFound";
import Profile from "../routes/Profile";
import Root from "../routes/Root";

export const paths = Object.freeze({
  root: "/",
  login: "/login",
  profile: "/profile",
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
]);

export default router;
