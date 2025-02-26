import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import FavoriteButton from '../favorite-button/favorite-button';

type OfferCardProps = {
  offer: Offer;
  onOfferHover?: (offer: Offer | null) => void;
  className?: string;
};

function OfferCard({
  offer,
  onOfferHover,
  className = 'cities'
}: OfferCardProps): JSX.Element {
  const {
    id,
    title,
    type,
    price,
    previewImage,
    isFavorite,
    isPremium,
    rating
  } = offer;

  return (
    <article
      className={`${className}__card place-card`}
      onMouseEnter={() => onOfferHover?.(offer)}
      onMouseLeave={() => onOfferHover?.(null)}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt={title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton
            offerId={id}
            isFavorite={isFavorite}
            className="place-card__bookmark-button"
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(rating) * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
