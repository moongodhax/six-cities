import { createSelector } from '@reduxjs/toolkit';
import { SortType } from '../../const';
import { Offer } from '../../types/offer';
import { State } from '../../types/state';

export const getCity = (state: State) => state.offersData.city;
export const getOffers = (state: State) => state.offersData.offers;
export const getSort = (state: State) => state.offersData.sortType;
export const getIsOffersLoading = (state: State) =>
  state.offersData.isOffersLoading;
export const getHasError = (state: State) => state.offersData.hasError;
export const getOffer = (state: State) => state.offersData.offer;
export const getIsOfferLoading = (state: State) =>
  state.offersData.isOfferLoading;
export const getNearbyOffers = (state: State) =>
  state.offersData.nearbyOffers.slice(0, 3);

const getSortedOffers = (offers: Offer[], sortType: SortType): Offer[] => {
  switch (sortType) {
    case SortType.PriceAsc:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortType.PriceDesc:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortType.TopRated:
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};

export const getFilteredOffers = createSelector(
  [getOffers, getCity, getSort],
  (offers: Offer[], city, sortType): Offer[] => {
    const filteredOffers = offers.filter(
      (offer) => offer.city.name === city.name
    );
    return getSortedOffers(filteredOffers, sortType);
  }
);
