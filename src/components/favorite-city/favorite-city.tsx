import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import FavoriteCard from '../favorite-card/favorite-card';

type FavoriteCityProps = {
  cityName: string;
  offers: Offer[];
};

function FavoriteCityComponent({ cityName, offers }: FavoriteCityProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={`/?city=${cityName}`}>
            <span>{cityName}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <FavoriteCard key={offer.id} offer={offer} />
        ))}
      </div>
    </li>
  );
}

const FavoriteCity = memo(FavoriteCityComponent);

export default FavoriteCity;
