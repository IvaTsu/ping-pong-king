import { createBrowserRouter } from "react-router-dom";

import Login from "../routes/Login";
import NotFound from "../routes/NotFound";
import Root from "../routes/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);

export default router;
