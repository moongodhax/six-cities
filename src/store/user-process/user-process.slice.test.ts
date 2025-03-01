import { AuthorizationStatus } from '../../const';
import { UserData } from '../../types/auth';
import { userProcess } from './user-process.slice';

describe('User Process Reducer', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userData: null,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should handle checkAuth.fulfilled', () => {
    const mockUserData = {
      id: 1,
      email: 'test@test.com',
      token: 'token',
    } as UserData;
    const action = {
      type: 'user/checkAuth/fulfilled',
      payload: mockUserData,
    };

    const result = userProcess.reducer(initialState, action);

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(result.userData).toEqual(mockUserData);
  });

  it('should handle checkAuth.rejected', () => {
    const action = { type: 'user/checkAuth/rejected' };
    const result = userProcess.reducer(initialState, action);

    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('should handle login.fulfilled', () => {
    const mockUserData = {
      id: 1,
      email: 'test@test.com',
      token: 'token',
    } as UserData;
    const action = {
      type: 'user/login/fulfilled',
      payload: mockUserData,
    };

    const result = userProcess.reducer(initialState, action);

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(result.userData).toEqual(mockUserData);
  });

  it('should handle login.rejected', () => {
    const action = { type: 'user/login/rejected' };
    const result = userProcess.reducer(initialState, action);

    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('should handle logout.fulfilled', () => {
    const state = {
      ...initialState,
      authorizationStatus: AuthorizationStatus.Auth,
      userData: { id: 1, email: 'test@test.com', token: 'token' } as UserData,
    };

    const action = { type: 'user/logout/fulfilled' };
    const result = userProcess.reducer(state, action);

    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(result.userData).toBeNull();
  });
});
