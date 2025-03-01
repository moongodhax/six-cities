import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { AppRoute } from '../const';
import { redirectToRoute } from '../store/action';

export const redirect: Middleware =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_store) => (next) => (action: PayloadAction<AppRoute>) => {
    if (action.type === redirectToRoute.type) {
      window.location.assign(action.payload);
    }

    return next(action);
  };
