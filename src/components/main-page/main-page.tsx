import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getCity,
  getFilteredOffers,
  getHasError,
  getIsOffersLoading
} from '../../store/offers-data/offers-data.selectors';
import { fetchOffers } from '../../store/offers-data/offers-data.slice';
import { Offer } from '../../types/offer';
import CitiesList from '../cities-list/cities-list';
import Map from '../map/map';
import OffersList from '../offers-list/offers-list';
import Sorting from '../sorting/sorting';
import Spinner from '../spinner/spinner';

function MainPage(): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const city = useAppSelector(getCity);
  const offers = useAppSelector(getFilteredOffers);
  const isOffersLoading = useAppSelector(getIsOffersLoading);
  const hasError = useAppSelector(getHasError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  if (isOffersLoading) {
    return <Spinner />;
  }

  if (hasError) {
    return <div>Error loading offers</div>;
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offers.length} places to stay in {city.name}
              </b>
              <Sorting />
              <div className="cities__places-list places__list tabs__content">
                <OffersList offers={offers} onOfferHover={setSelectedOffer} />
              </div>
            </section>
            <div className="cities__right-section">
              <Map city={city} offers={offers} selectedOffer={selectedOffer} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
