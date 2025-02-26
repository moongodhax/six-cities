import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { offersData } from './offers-data/offers-data.slice';
import { userProcess } from './user-process/user-process.slice';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    offersData: offersData.reducer,
    userProcess: userProcess.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    })
});
