import { useLocation, useNavigate } from "react-router-dom";

import { paths } from "../router/router";
import { useAuthStore, useOpponentStore, useUserStore } from "../store";
import { decodeJWT, type IDecodedIdToken } from "../utils/decodeJWT";

const NavigationBar = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const { getAuth, clear: clearAuth } = useAuthStore();
  const auth = getAuth();
  const userFromIdToken = decodeJWT<IDecodedIdToken>(auth?.idToken);

  const { getUser, clear: clearUser } = useUserStore();
  const currentUser = getUser();

  const { clear: clearOpponent } = useOpponentStore();

  const _onRootClick = (): void => {
    navigate(paths.root);
  };

  const _onProfileClick = (): void => {
    navigate(paths.profile);
  };

  const _onAddGameClick = (): void => {
    navigate(paths.addGame);
  };

  const _onSignOutClick = (): void => {
    clearAuth();
    clearUser();
    clearOpponent();
    navigate(paths.login);
  };

  return (
    <div className="navbar pb-15 bg-aqua dark:bg-cloud">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className={`menu menu-compact dropdown-content mt-3 p-2 shadow bg-aqua dark:bg-cloudBirst rounded-box w-52`}
          >
            {location.pathname !== paths.root && (
              <li>
                <a onClick={_onRootClick}>Homepage</a>
              </li>
            )}
            {location.pathname !== paths.addGame && (
              <li>
                <a onClick={_onAddGameClick}>Add game</a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-2xl" href="/">
          PING PONG KING
        </a>
      </div>

      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className={`btn btn-ghost btn-circle avatar ${
              currentUser?.registeredWhen == null ? "indicator" : ""
            }`}
          >
            {currentUser?.registeredWhen == null && (
              <span className="indicator-item badge badge-secondary">
                Action required
              </span>
            )}
            {userFromIdToken?.picture != null ? (
              <div className="w-10 rounded-full">
                <img src={userFromIdToken.picture} />
              </div>
            ) : (
              <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                  <span className="text-xl">
                    {userFromIdToken?.given_name?.charAt(0)}
                    {userFromIdToken?.family_name?.charAt(0)}
                  </span>
                </div>
              </div>
            )}
          </label>
          <ul
            tabIndex={0}
            className={`menu menu-compact dropdown-content mt-3 p-2 shadow bg-aqua dark:bg-cloudBirst rounded-box w-52`}
          >
            {location.pathname !== paths.profile && (
              <li>
                <a className="justify-between" onClick={_onProfileClick}>
                  Profile
                  {currentUser?.registeredWhen == null && (
                    <span className="badge">update</span>
                  )}
                </a>
              </li>
            )}
            <li>
              <a onClick={_onSignOutClick}>Sign out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
