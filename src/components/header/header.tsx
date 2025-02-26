import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavorites } from '../../store/offers-data/offers-data.selectors';
import { logout } from '../../store/user-process/user-process.action';
import {
  getAuthorizationStatus,
  getUserData
} from '../../store/user-process/user-process.selectors';

function Header(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userData = useAppSelector(getUserData);
  const favorites = useAppSelector(getFavorites);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to="/">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <>
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to="/favorites"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                        {userData?.email}
                      </span>
                      <span className="header__favorite-count">
                        {favorites.length}
                      </span>
                    </Link>
                    <Link
                      className="header__nav-link"
                      to="/"
                      onClick={handleLogout}
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </>
                ) : (
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to="/login"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
