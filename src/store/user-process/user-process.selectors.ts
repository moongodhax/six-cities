import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State) =>
  state.userProcess.authorizationStatus;

export const getUserData = (state: State) => state.userProcess.userData;
