import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useNavigate } from "react-router-dom";

import { paths } from "../router/router";
import { useUserStore } from "../store";

const NavigationBar = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const { getUser } = useUserStore();
  const currentUser = getUser();
  const { logout, user: auth0User } = useAuth0();

  const _onRootClick = (): void => {
    navigate(paths.root);
  };

  const _onProfileClick = (): void => {
    navigate(paths.profile);
  };

  const _onAddGameClick = (): void => {
    navigate(paths.addGame);
  };

  const _onApiTestClick = (): void => {
    navigate(paths.apiTest);
  };

  const _onSignOutClick = (): void => {
    logout({ logoutParams: { returnTo: window.location.origin } }).catch(() => {
      // Handle logout error if needed
    });
  };

  return (
    <div className="pb-15 navbar bg-aqua dark:bg-cloud">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-circle btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
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
            className={
              "dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-aqua p-2 shadow dark:bg-cloudBirst"
            }
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
            {location.pathname !== paths.apiTest && (
              <li>
                <a onClick={_onApiTestClick}>Test API</a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a
          className="btn btn-ghost font-ubuntuBold text-xl font-normal normal-case sm:text-2xl"
          href="/"
        >
          👑 PING PONG KING 👑
        </a>
      </div>

      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className={`avatar btn btn-circle btn-ghost ${
              currentUser?.registeredWhen == null ? "indicator" : ""
            }`}
          >
            {currentUser?.registeredWhen == null && (
              <span className="badge indicator-item badge-secondary">
                Action required
              </span>
            )}
            {currentUser?.profileImage != null ? (
              <div className="w-10 rounded-full">
                <img src={currentUser.profileImage} />
              </div>
            ) : (
              <div className="avatar placeholder">
                <div className="w-10 rounded-full bg-neutral-focus text-neutral-content">
                  <span className="text-xl">
                    {auth0User?.given_name?.charAt(0)}
                    {auth0User?.family_name?.charAt(0)}
                  </span>
                </div>
              </div>
            )}
          </label>
          <ul
            tabIndex={0}
            className={
              "dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-aqua p-2 shadow dark:bg-cloudBirst"
            }
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
