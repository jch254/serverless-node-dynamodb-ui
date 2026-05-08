import { combineReducers, Reducer } from 'redux';
import recycleState from 'redux-recycle';

import authReducer, { AuthState, LOGOUT } from './auth/reducer';
import itemsReducer, { initialState as itemsInitialsState, ItemsState } from './items/reducer';

export interface GlobalState {
  auth: AuthState;
  items: ItemsState;
}

export default combineReducers({
  auth: authReducer,
  items: recycleState(itemsReducer, [LOGOUT], itemsInitialsState),
}) as unknown as Reducer<GlobalState>;
