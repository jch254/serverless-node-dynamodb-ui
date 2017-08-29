import { routerReducer, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';
import recycleState from 'redux-recycle';

import authReducer, { AuthState, LOGOUT } from './auth/reducer';
import itemsReducer, { initialState as itemsInitialsState, ItemsState } from './items/reducer';

export interface GlobalState {
  auth: AuthState;
  items: ItemsState;
  router: RouterState;
}

export default combineReducers<GlobalState>({
  auth: authReducer,
  items: recycleState(itemsReducer, [LOGOUT], itemsInitialsState),
  router: routerReducer,
});
