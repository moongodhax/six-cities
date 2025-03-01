/* eslint-disable @typescript-eslint/await-thenable */
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { APIRoute } from '../../const';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import {
  fetchFavorites,
  fetchNearbyOffers,
  fetchOffer,
  fetchOffers,
  fetchReviews,
  postReview,
  toggleFavorite,
} from './offers-data.slice';

describe('Async operations', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action>(middlewares);

  it('should fetch offers when GET /offers', async () => {
    const mockOffers = [{ id: '1' }, { id: '2' }];
    mockAPI.onGet(APIRoute.Offers).reply(200, mockOffers);

    const store = mockStore();
    await store.dispatch(fetchOffers());

    const actions = store.getActions();
    expect(actions[0].type).toBe(fetchOffers.pending.type);
    expect(actions[1].type).toBe(fetchOffers.fulfilled.type);
    expect(actions[1].payload).toEqual(mockOffers);
  });

  it('should fetch offer when GET /offers/:id', async () => {
    const mockOffer = { id: '1' };
    mockAPI.onGet(`${APIRoute.Offers}/1`).reply(200, mockOffer);

    const store = mockStore();
    await store.dispatch(fetchOffer('1'));

    const actions = store.getActions();
    expect(actions[0].type).toBe(fetchOffer.pending.type);
    expect(actions[1].type).toBe(fetchOffer.fulfilled.type);
    expect(actions[1].payload).toEqual(mockOffer);
  });

  it('should fetch nearby offers when GET /offers/:id/nearby', async () => {
    const mockNearbyOffers = [{ id: '2' }, { id: '3' }];
    mockAPI.onGet(`${APIRoute.Offers}/1/nearby`).reply(200, mockNearbyOffers);

    const store = mockStore();
    await store.dispatch(fetchNearbyOffers('1'));

    const actions = store.getActions();
    expect(actions[0].type).toBe(fetchNearbyOffers.pending.type);
    expect(actions[1].type).toBe(fetchNearbyOffers.fulfilled.type);
    expect(actions[1].payload).toEqual(mockNearbyOffers);
  });

  it('should fetch reviews when GET /comments/:id', async () => {
    const mockReviews = [{ id: '1' }, { id: '2' }];
    mockAPI.onGet(`${APIRoute.Comments}/1`).reply(200, mockReviews);

    const store = mockStore();
    await store.dispatch(fetchReviews('1'));

    const actions = store.getActions();
    expect(actions[0].type).toBe(fetchReviews.pending.type);
    expect(actions[1].type).toBe(fetchReviews.fulfilled.type);
    expect(actions[1].payload).toEqual(mockReviews);
  });

  it('should post review when POST /comments/:id', async () => {
    const mockReviews = [{ id: '1' }];
    const reviewData = { offerId: '1', comment: 'Test comment', rating: 5 };

    mockAPI
      .onPost(`${APIRoute.Comments}/1`, { comment: 'Test comment', rating: 5 })
      .reply(200, mockReviews);

    const store = mockStore();
    await store.dispatch(postReview(reviewData));

    const actions = store.getActions();
    expect(actions[0].type).toBe(postReview.pending.type);
    expect(actions[1].type).toBe(postReview.fulfilled.type);
    expect(actions[1].payload).toEqual(mockReviews);
  });

  it('should fetch favorites when GET /favorite', async () => {
    const mockFavorites = [{ id: '1' }, { id: '2' }];
    mockAPI.onGet('/favorite').reply(200, mockFavorites);

    const store = mockStore();
    await store.dispatch(fetchFavorites());

    const actions = store.getActions();
    expect(actions[0].type).toBe(fetchFavorites.pending.type);
    expect(actions[1].type).toBe(fetchFavorites.fulfilled.type);
    expect(actions[1].payload).toEqual(mockFavorites);
  });

  it('should toggle favorite status when POST /favorite/:id/:status', async () => {
    const mockOffer = { id: '1', isFavorite: true };
    mockAPI.onPost(`${APIRoute.Favorite}/1/1`).reply(200, mockOffer);

    const store = mockStore();
    await store.dispatch(toggleFavorite({ offerId: '1', status: 1 }));

    const actions = store.getActions();
    expect(actions[0].type).toBe(toggleFavorite.pending.type);
    expect(actions[1].type).toBe(toggleFavorite.fulfilled.type);
    expect(actions[1].payload).toEqual(mockOffer);
  });
});
