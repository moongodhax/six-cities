import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { APIRoute } from '../../const';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { checkAuth, login, logout } from './user-process.action';

/* eslint-disable @typescript-eslint/await-thenable */

describe('User process async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action>(middlewares);

  it('should set auth status to "AUTH" when server returns 200', async () => {
    const store = mockStore();
    const mockUser = { id: 1, email: 'test@test.com', token: 'token' };

    mockAPI.onGet(APIRoute.Login).reply(200, mockUser);

    await store.dispatch(checkAuth());

    const actions = store.getActions();
    expect(actions[0].type).toBe(checkAuth.pending.type);
    expect(actions[1].type).toBe(checkAuth.fulfilled.type);
    expect(actions[1].payload).toEqual(mockUser);
  });

  it('should set auth status to "NO_AUTH" when server returns 401', async () => {
    const store = mockStore();

    mockAPI.onGet(APIRoute.Login).reply(401);

    await store.dispatch(checkAuth());

    const actions = store.getActions();
    expect(actions[0].type).toBe(checkAuth.pending.type);
    expect(actions[1].type).toBe(checkAuth.fulfilled.type);
    expect(actions[1].payload).toEqual({ id: 0, email: '', token: '' });
  });

  it('should dispatch login when POST /login', async () => {
    const store = mockStore();
    const mockUser = { id: 1, email: 'test@test.com', token: 'token' };
    const authData = { login: 'test@test.com', password: '123456' };

    mockAPI
      .onPost(APIRoute.Login, {
        email: authData.login,
        password: authData.password,
      })
      .reply(200, mockUser);

    await store.dispatch(login(authData));

    const actions = store.getActions();
    expect(actions[0].type).toBe(login.pending.type);
    expect(actions[1].type).toBe(login.fulfilled.type);
    expect(actions[1].payload).toEqual(mockUser);
  });

  it('should dispatch logout when DELETE /logout', async () => {
    const store = mockStore();

    mockAPI.onDelete(APIRoute.Logout).reply(204);

    await store.dispatch(logout());

    const actions = store.getActions();
    expect(actions[0].type).toBe(logout.pending.type);
    expect(actions[1].type).toBe(logout.fulfilled.type);
  });
});
