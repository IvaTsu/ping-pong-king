import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useNavigate } from "react-router-dom";

import { paths } from "../router/router";
import { useUserStore } from "../store";

const NavigationBar = (): JSX.Element => {
  const { logout, user } = useAuth0();

  const location = useLocation();
  const navigate = useNavigate();

  const { getUser } = useUserStore();
  const currentUser = getUser();

  const _onRootClick = (): void => {
    navigate("/");
  };

  const _onProfileClick = (): void => {
    navigate("/profile");
  };

  const _onSignOutClick = (): void => {
    logout({ logoutParams: { returnTo: `${window.location.origin}/login` } });
  };

  return (
    <>
      <div className="navbar bg-base-100">
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
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {location.pathname !== paths.root && (
                <li>
                  <a onClick={_onRootClick}>Homepage</a>
                </li>
              )}
              <li>
                <a>Add game</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl" href="/">
            Ping Pong King
          </a>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className={`btn btn-ghost btn-circle avatar ${
                currentUser?.isRegistered === true ? "" : "indicator"
              }`}
            >
              {currentUser?.isRegistered === false && (
                <span className="indicator-item badge badge-secondary">
                  Action required
                </span>
              )}
              <div className="w-10 rounded-full">
                <img src={user?.picture} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {location.pathname !== paths.profile && (
                <li>
                  <a className="justify-between" onClick={_onProfileClick}>
                    Profile
                    {currentUser?.isRegistered === false && (
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
    </>
  );
};

export default NavigationBar;
