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
import Header from '../header/header';
import MainEmpty from '../main-empty/main-empty';
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
    return (
      <div className="page page--gray page--main">
        <Header />
        <main className="page__main page__main--index">
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">Error loading offers</b>
                  <p className="cities__status-description">
                    Please try again later
                  </p>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList />
        </div>
        {offers.length > 0 ? (
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
                <Map
                  city={city}
                  offers={offers}
                  selectedOffer={selectedOffer}
                />
              </div>
            </div>
          </div>
        ) : (
          <MainEmpty />
        )}
      </main>
    </div>
  );
}

export default MainPage;
