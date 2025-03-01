import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../const';
import { dropToken, saveToken } from '../../services/token';
import { AuthData, UserData } from '../../types/auth';
import { ThunkOptions } from '../../types/state';

export const checkAuth = createAsyncThunk<UserData, undefined, ThunkOptions>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    try {
      const response = await api?.get<UserData>(APIRoute.Login);
      return response?.data || { id: 0, email: '', token: '' };
    } catch (error) {
      return { id: 0, email: '', token: '' };
    }
  }
);

export const login = createAsyncThunk<UserData, AuthData, ThunkOptions>(
  'user/login',
  async ({ login: email, password }, { extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password,
    });
    saveToken(data.token);
    return data;
  }
);

export const logout = createAsyncThunk<void, undefined, ThunkOptions>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);
