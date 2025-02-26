import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { DEFAULT_CITY, SortType } from '../../const';
import { Offer } from '../../types/offer';
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

type OffersData = {
  city: City;
  offers: Offer[];
  offer: Offer | null;
  nearbyOffers: Offer[];
  sortType: SortType;
  isOffersLoading: boolean;
  isOfferLoading: boolean;
  hasError: boolean;
};

const initialState: OffersData = {
  city: DEFAULT_CITY,
  offers: [],
  offer: null,
  nearbyOffers: [],
  sortType: SortType.Popular,
  isOffersLoading: false,
  isOfferLoading: false,
  hasError: false
};

export const fetchOffers = createAsyncThunk<
  Offer[],
  undefined,
  { extra: AxiosInstance }
>('data/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>('/offers');
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
      });
  }
});

export const { setCity, setSort } = offersData.actions;
