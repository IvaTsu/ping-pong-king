import "../App.css";

import { useAuth0 } from "@auth0/auth0-react";

import NavigationBar from "../components/NavigationBar";
import ProtectedRoute from "../routes/ProtectedRoute";

function Profile(): JSX.Element {
  const { logout, user } = useAuth0();

  const _onSignOutClick = (): void => {
    logout({ logoutParams: { returnTo: `${window.location.origin}/login` } });
  };

  return (
    <ProtectedRoute>
      <>
        <NavigationBar />
        <div className="App">
          <div>
            <h1>Hello, {user?.name}</h1>
            <img src={user?.picture} referrerPolicy="no-referrer"></img>
            <p>{user?.email}</p>
            <button onClick={_onSignOutClick}>Sign Out</button>
          </div>
        </div>
      </>
    </ProtectedRoute>
  );
}

export default Profile;
