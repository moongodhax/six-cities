import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getHasError,
  getIsOfferLoading,
  getNearbyOffers,
  getOffer,
  getReviews
} from '../../store/offers-data/offers-data.selectors';
import {
  fetchNearbyOffers,
  fetchOffer,
  fetchReviews
} from '../../store/offers-data/offers-data.slice';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import FavoriteButton from '../favorite-button/favorite-button';
import Header from '../header/header';
import Map from '../map/map';
import OffersList from '../offers-list/offers-list';
import ReviewForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/reviews-list';
import Spinner from '../spinner/spinner';

function OfferPage(): JSX.Element {
  const { id } = useParams();
  const offer = useAppSelector(getOffer);
  const reviews = useAppSelector(getReviews);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const isLoading = useAppSelector(getIsOfferLoading);
  const hasError = useAppSelector(getHasError);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchOffer(id));
      dispatch(fetchNearbyOffers(id));
      dispatch(fetchReviews(id));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (hasError || !offer) {
    return (
      <div className="page">
        <Header />
        <main className="page__main page__main--offer">
          <div className="container">
            <section className="offer-error">
              <h1>Not found</h1>
              <p>Sorry, the offer you&apos;re looking for doesn&apos;t exist.</p>
              <Link to="/" className="offer-error__link">
                Return to main page
              </Link>
            </section>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img
                    className="offer__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <FavoriteButton
                  offerId={offer.id}
                  isFavorite={offer.isFavorite}
                  className="offer__bookmark-button"
                  width={31}
                  height={33}
                />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${offer.rating * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper ${
                      offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''
                    } user__avatar-wrapper`}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  {offer.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList reviews={reviews} />
                {authorizationStatus === AuthorizationStatus.Auth && id && (
                  <ReviewForm offerId={id} />
                )}
              </section>
            </div>
          </div>
        </section>
        <Map
          city={offer.city}
          offers={[offer, ...nearbyOffers]}
          selectedOffer={null}
        />
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <OffersList
                offers={nearbyOffers}
                className="near-places__list"
                onOfferHover={() => null}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
