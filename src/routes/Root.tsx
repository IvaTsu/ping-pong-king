import "../App.css";

import { useSessionStore, useUserStore } from "../store";
import ProtectedRoute from "./ProtectedRoute";

function Root(): JSX.Element {
  const { clear: clearSession } = useSessionStore();
  const { clear: clearUser, getUser } = useUserStore();

  const user = getUser();

  const _onSignOutClick = (): void => {
    clearSession();
    clearUser();
  };

  return (
    <ProtectedRoute>
      <div className="App">
        <div>
          <h1>Hello, {user?.name}</h1>
          <img src={user?.picture} referrerPolicy="no-referrer"></img>
          <p>{user?.email}</p>
          <button onClick={_onSignOutClick}>Sign Out</button>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Root;
