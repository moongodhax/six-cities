import { City, Offer } from '../mocks/offers';
import { store } from '../store';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  city: City;
  offers: Offer[];
};
