import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getFavorites,
  getIsFavoritesLoading
} from '../../store/offers-data/offers-data.selectors';
import { fetchFavorites } from '../../store/offers-data/offers-data.slice';
import FavoriteCity from '../favorite-city/favorite-city';
import Header from '../header/header';
import Spinner from '../spinner/spinner';

function FavoritesPage(): JSX.Element {
  const favorites = useAppSelector(getFavorites);
  const isLoading = useAppSelector(getIsFavoritesLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const groupedFavorites = useMemo(() => Object.entries(
    favorites.reduce<{ [key: string]: typeof favorites }>((acc, offer) => {
      const cityName = offer.city.name;
      if (!acc[cityName]) {
        acc[cityName] = [];
      }
      acc[cityName].push(offer);
      return acc;
    }, {})
  ), [favorites]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favorites.length > 0 ? (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {groupedFavorites.map(([cityName, cityOffers]) => (
                  <FavoriteCity
                    key={cityName}
                    cityName={cityName}
                    offers={cityOffers}
                  />
                ))}
              </ul>
            </section>
          ) : (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future
                  trips.
                </p>
              </div>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
