import { Offer } from '../../mocks/offers';
import PlaceCard from '../place-card/place-card';

type OffersListProps = {
  offers: Offer[];
  className?: string;
  onOfferHover: (offer: Offer | null) => void;
};

function OffersList({
  offers,
  className = 'cities__places-list places__list',
  onOfferHover
}: OffersListProps): JSX.Element {
  return (
    <div className={`${className} tabs__content`}>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => onOfferHover(offer)}
          onMouseLeave={() => onOfferHover(null)}
        />
      ))}
    </div>
  );
}

export default OffersList;
