import { GlobalState } from '../rootReducer';

export const getError = (state: GlobalState): string | undefined => state.auth.error;

export const getIdToken = (state: GlobalState): string | undefined => state.auth.idToken;

export const getIsLoggedIn = (state: GlobalState): boolean => state.auth.profile !== undefined;
