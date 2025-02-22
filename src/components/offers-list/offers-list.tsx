import { useState } from 'react';
import { Offer } from '../../mocks/offers';
import PlaceCard from '../place-card/place-card';

type OffersListProps = {
	offers: Offer[];
	className?: string;
};

function OffersList({
  offers,
  className = 'cities__places-list places__list'
}: OffersListProps): JSX.Element {
  const [, setActiveOffer] = useState<Offer | null>(null);

  return (
    <div className={`${className} tabs__content`}>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => setActiveOffer(offer)}
          onMouseLeave={() => setActiveOffer(null)}
        />
      ))}
    </div>
  );
}

export default OffersList;
