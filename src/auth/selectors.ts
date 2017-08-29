import { GlobalState } from '../rootReducer';

export const getError = (state: GlobalState): string | null => state.auth.error;

export const getIdToken = (state: GlobalState): string | null => state.auth.idToken;

export const getIsLoggedIn = (state: GlobalState): boolean => state.auth.profile !== null;
