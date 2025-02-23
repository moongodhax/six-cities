import { useEffect, useState } from 'react';
import { SortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { offers as mockOffers, Offer } from '../../mocks/offers';
import { setOffers } from '../../store/user-process/user-process.slice';
import CitiesList from '../cities-list/cities-list';
import Map from '../map/map';
import OffersList from '../offers-list/offers-list';
import Sorting from '../sorting/sorting';

function MainPage(): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [currentSort, setCurrentSort] = useState<SortType>(SortType.Popular);
  const dispatch = useAppDispatch();
  const { city, offers } = useAppSelector((state) => state.USER);

  useEffect(() => {
    dispatch(setOffers(mockOffers));
  }, [dispatch]);

  const filteredOffers = offers.filter((offer: Offer) => offer.city.name === city.name);

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    switch (currentSort) {
      case SortType.PriceLowToHigh:
        return a.price - b.price;
      case SortType.PriceHighToLow:
        return b.price - a.price;
      case SortType.TopRated:
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

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
                {sortedOffers.length} places to stay in {city.name}
              </b>
              <Sorting
                currentSort={currentSort}
                onSortChange={setCurrentSort}
              />
              <div className="cities__places-list places__list tabs__content">
                <OffersList
                  offers={sortedOffers}
                  onOfferHover={setSelectedOffer}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <Map
                city={city}
                offers={sortedOffers}
                selectedOffer={selectedOffer}
                className="cities__map"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
