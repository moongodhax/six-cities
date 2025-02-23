import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City, Offer } from '../../mocks/offers';
import { UserProcess } from '../../types/state';

const initialState: UserProcess = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  offers: []
};

export const userProcess = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload.map((offer: Offer): Offer => ({ ...offer }));
    }
  }
});

export const { setCity, setOffers } = userProcess.actions;
