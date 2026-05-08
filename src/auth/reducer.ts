import { Auth0Client } from '@auth0/auth0-spa-js';
import iassign from 'immutable-assign';

export const SET_AUTH0_CLIENT = 'SET_AUTH0_CLIENT';

export interface SetAuth0Client {
  type: 'SET_AUTH0_CLIENT';
  auth0Client: Auth0Client;
}

type AuthAction = SetAuth0Client;

export interface AuthState {
  auth0Client?: Auth0Client;
}

export const initialState: AuthState = {};

export default function reducer(state: AuthState = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case SET_AUTH0_CLIENT:
      return iassign(
        state,
        (s) => {
          s.auth0Client = action.auth0Client;

          return s;
        },
      );
    default:
      return state;
  }
}

export const setAuth0Client = (auth0Client: Auth0Client): SetAuth0Client => ({
  type: SET_AUTH0_CLIENT,
  auth0Client,
});
