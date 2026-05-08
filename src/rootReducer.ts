import { combineReducers, Reducer } from 'redux';

import authReducer, { AuthState } from './auth/reducer';
import itemsReducer, { ItemsState } from './items/reducer';

export interface GlobalState {
  auth: AuthState;
  items: ItemsState;
}

export default combineReducers({
  auth: authReducer,
  items: itemsReducer,
}) as unknown as Reducer<GlobalState>;
