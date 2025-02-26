import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, DEFAULT_CITY, SortType } from '../../const';
import { Offer } from '../../types/offer';
import { Review, ReviewData } from '../../types/review';
import { City } from '../../types/state';

export const fetchOffer = createAsyncThunk<
  Offer,
  string,
  { extra: AxiosInstance }
>('data/fetchOffer', async (id, { extra: api }) => {
  const { data } = await api.get<Offer>(`/offers/${id}`);
  return data;
});

export const fetchNearbyOffers = createAsyncThunk<
  Offer[],
  string,
  { extra: AxiosInstance }
>('data/fetchNearbyOffers', async (id, { extra: api }) => {
  const { data } = await api.get<Offer[]>(`/offers/${id}/nearby`);
  return data;
});

export const fetchReviews = createAsyncThunk<
  Review[],
  string,
  { extra: AxiosInstance }
>('data/fetchReviews', async (id, { extra: api }) => {
  const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
  return data;
});

export const postReview = createAsyncThunk<
  Review[],
  ReviewData,
  { extra: AxiosInstance }
>('data/postReview', async ({ offerId, comment, rating }, { extra: api }) => {
  const { data } = await api.post<Review[]>(`${APIRoute.Comments}/${offerId}`, {
    comment,
    rating
  });
  return data;
});

export const fetchFavorites = createAsyncThunk<
  Offer[],
  undefined,
  { extra: AxiosInstance }
>('data/fetchFavorites', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>('/favorite');
  return data;
});

export const toggleFavorite = createAsyncThunk<
  Offer,
  { offerId: string; status: number },
  { extra: AxiosInstance }
>('data/toggleFavorite', async ({ offerId, status }, { extra: api }) => {
  const { data } = await api.post<Offer>(
    `${APIRoute.Favorite}/${offerId}/${status}`
  );
  return data;
});

type OffersData = {
  city: City;
  offers: Offer[];
  offer: Offer | null;
  nearbyOffers: Offer[];
  sortType: SortType;
  isOffersLoading: boolean;
  isOfferLoading: boolean;
  hasError: boolean;
  reviews: Review[];
  isReviewsLoading: boolean;
  isReviewPosting: boolean;
  favorites: Offer[];
  isFavoritesLoading: boolean;
};

const initialState: OffersData = {
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
  isFavoritesLoading: false
};

export const fetchOffers = createAsyncThunk<
  Offer[],
  undefined,
  { extra: AxiosInstance }
>('data/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>(APIRoute.Offers);
  return data;
});

export const offersData = createSlice({
  name: 'OFFERS_DATA',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setSort: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isOffersLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isOffersLoading = false;
        state.hasError = true;
      })
      .addCase(fetchOffer.pending, (state) => {
        state.isOfferLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.isOfferLoading = false;
        state.hasError = true;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchReviews.pending, (state) => {
        state.isReviewsLoading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsLoading = false;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.isReviewsLoading = false;
      })
      .addCase(postReview.pending, (state) => {
        state.isReviewPosting = true;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewPosting = false;
      })
      .addCase(postReview.rejected, (state) => {
        state.isReviewPosting = false;
      })
      .addCase(fetchFavorites.pending, (state) => {
        state.isFavoritesLoading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isFavoritesLoading = false;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.isFavoritesLoading = false;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        // Обновляем в списке offers
        const offerIndex = state.offers.findIndex(
          (offer) => offer.id === updatedOffer.id
        );
        if (offerIndex !== -1) {
          state.offers[offerIndex] = updatedOffer;
        }

        // Обновляем текущее предложение если оно открыто
        if (state.offer?.id === updatedOffer.id) {
          state.offer = updatedOffer;
        }

        // Обновляем в списке nearby
        const nearbyIndex = state.nearbyOffers.findIndex(
          (offer) => offer.id === updatedOffer.id
        );
        if (nearbyIndex !== -1) {
          state.nearbyOffers[nearbyIndex] = updatedOffer;
        }

        // Обновляем в избранном
        if (updatedOffer.isFavorite) {
          if (!state.favorites.some((offer) => offer.id === updatedOffer.id)) {
            state.favorites.push(updatedOffer);
          }
        } else {
          state.favorites = state.favorites.filter(
            (offer) => offer.id !== updatedOffer.id
          );
        }
      });
  }
});

export const { setCity, setSort } = offersData.actions;
