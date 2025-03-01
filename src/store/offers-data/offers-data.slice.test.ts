import { DEFAULT_CITY, SortType } from '../../const';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';
import { offersData, setCity, setSort } from './offers-data.slice';

describe('Offers Data Reducer', () => {
  const initialState = {
    city: DEFAULT_CITY,
    offers: [],
    offer: null,
    nearbyOffers: [],
    sortType: SortType.Popular,
    isOffersLoading: false,
    isOfferLoading: false,
    hasError: false,
    reviews: [],
    isReviewsLoading: false,
    isReviewPosting: false,
    favorites: [],
    isFavoritesLoading: false,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = offersData.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set city with "setCity" action', () => {
    const city = {
      name: 'Brussels',
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 13,
      },
    };

    const result = offersData.reducer(initialState, setCity(city));

    expect(result.city).toEqual(city);
  });

  it('should set sort type with "setSort" action', () => {
    const sortType = SortType.PriceAsc;

    const result = offersData.reducer(initialState, setSort(sortType));

    expect(result.sortType).toEqual(sortType);
  });

  it('should handle fetchOffers.pending', () => {
    const action = { type: 'data/fetchOffers/pending' };
    const result = offersData.reducer(initialState, action);

    expect(result.isOffersLoading).toBe(true);
    expect(result.hasError).toBe(false);
  });

  it('should handle fetchOffers.fulfilled', () => {
    const mockOffers = [{ id: '1' }, { id: '2' }] as Offer[];
    const action = {
      type: 'data/fetchOffers/fulfilled',
      payload: mockOffers,
    };

    const result = offersData.reducer(initialState, action);

    expect(result.offers).toEqual(mockOffers);
    expect(result.isOffersLoading).toBe(false);
  });

  it('should handle fetchOffers.rejected', () => {
    const action = { type: 'data/fetchOffers/rejected' };
    const result = offersData.reducer(initialState, action);

    expect(result.isOffersLoading).toBe(false);
    expect(result.hasError).toBe(true);
  });

  it('should handle fetchOffer.pending', () => {
    const action = { type: 'data/fetchOffer/pending' };
    const result = offersData.reducer(initialState, action);

    expect(result.isOfferLoading).toBe(true);
    expect(result.hasError).toBe(false);
  });

  it('should handle fetchOffer.fulfilled', () => {
    const mockOffer = { id: '1', title: 'Test Offer' } as Offer;
    const action = {
      type: 'data/fetchOffer/fulfilled',
      payload: mockOffer,
    };

    const result = offersData.reducer(initialState, action);

    expect(result.offer).toEqual(mockOffer);
    expect(result.isOfferLoading).toBe(false);
  });

  it('should handle fetchOffer.rejected', () => {
    const action = { type: 'data/fetchOffer/rejected' };
    const result = offersData.reducer(initialState, action);

    expect(result.isOfferLoading).toBe(false);
    expect(result.hasError).toBe(true);
  });

  it('should handle fetchNearbyOffers.fulfilled', () => {
    const mockNearbyOffers = [{ id: '1' }, { id: '2' }] as Offer[];
    const action = {
      type: 'data/fetchNearbyOffers/fulfilled',
      payload: mockNearbyOffers,
    };

    const result = offersData.reducer(initialState, action);

    expect(result.nearbyOffers).toEqual(mockNearbyOffers);
  });

  it('should handle fetchReviews.pending', () => {
    const action = { type: 'data/fetchReviews/pending' };
    const result = offersData.reducer(initialState, action);

    expect(result.isReviewsLoading).toBe(true);
  });

  it('should handle fetchReviews.fulfilled', () => {
    const mockReviews = [{ id: '1' }, { id: '2' }] as Review[];
    const action = {
      type: 'data/fetchReviews/fulfilled',
      payload: mockReviews,
    };

    const result = offersData.reducer(initialState, action);

    expect(result.reviews).toEqual(mockReviews);
    expect(result.isReviewsLoading).toBe(false);
  });

  it('should handle fetchReviews.rejected', () => {
    const action = { type: 'data/fetchReviews/rejected' };
    const result = offersData.reducer(initialState, action);

    expect(result.isReviewsLoading).toBe(false);
  });

  it('should handle postReview.pending', () => {
    const action = { type: 'data/postReview/pending' };
    const result = offersData.reducer(initialState, action);

    expect(result.isReviewPosting).toBe(true);
  });

  it('should handle postReview.fulfilled', () => {
    const mockReviews = [{ id: '1' }, { id: '2' }] as Review[];
    const action = {
      type: 'data/postReview/fulfilled',
      payload: mockReviews,
    };

    const result = offersData.reducer(initialState, action);

    expect(result.reviews).toEqual(mockReviews);
    expect(result.isReviewPosting).toBe(false);
  });

  it('should handle postReview.rejected', () => {
    const action = { type: 'data/postReview/rejected' };
    const result = offersData.reducer(initialState, action);

    expect(result.isReviewPosting).toBe(false);
  });

  it('should handle fetchFavorites.pending', () => {
    const action = { type: 'data/fetchFavorites/pending' };
    const result = offersData.reducer(initialState, action);

    expect(result.isFavoritesLoading).toBe(true);
  });

  it('should handle fetchFavorites.fulfilled', () => {
    const mockFavorites = [{ id: '1' }, { id: '2' }] as Offer[];
    const action = {
      type: 'data/fetchFavorites/fulfilled',
      payload: mockFavorites,
    };

    const result = offersData.reducer(initialState, action);

    expect(result.favorites).toEqual(mockFavorites);
    expect(result.isFavoritesLoading).toBe(false);
  });

  it('should handle fetchFavorites.rejected', () => {
    const action = { type: 'data/fetchFavorites/rejected' };
    const result = offersData.reducer(initialState, action);

    expect(result.isFavoritesLoading).toBe(false);
  });

  it('should handle toggleFavorite.fulfilled', () => {
    const state = {
      ...initialState,
      offers: [
        { id: '1', isFavorite: false } as Offer,
        { id: '2', isFavorite: false } as Offer,
      ],
      offer: { id: '1', isFavorite: false } as Offer,
      nearbyOffers: [{ id: '1', isFavorite: false } as Offer],
      favorites: [],
    };

    const updatedOffer = { id: '1', isFavorite: true } as Offer;
    const action = {
      type: 'data/toggleFavorite/fulfilled',
      payload: updatedOffer,
    };

    const result = offersData.reducer(state, action);

    // Check if offer was updated in offers array
    expect(result.offers[0].isFavorite).toBe(true);

    // Check if current offer was updated
    expect(result.offer?.isFavorite).toBe(true);

    // Check if offer was updated in nearbyOffers
    expect(result.nearbyOffers[0].isFavorite).toBe(true);

    // Check if offer was added to favorites
    expect(result.favorites).toContainEqual(updatedOffer);
  });
});
