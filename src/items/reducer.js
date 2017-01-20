import { Map } from 'immutable';

import {
  API_SERVICE_FAILURE,
} from '../app/actions';

export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const UPDATE_NEW_ITEM_NAME = 'UPDATE_NEW_ITEM_NAME';
export const CREATE_ITEM = 'CREATE_ITEM';
export const CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS';
export const DELETE_ITEM = 'DELETE_ITEM';

const initialState = new Map({
  isFetching: false,
  items: new Map(),
  newItemName: '',
  error: null,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return state.set('isFetching', true);
    case FETCH_ITEMS_SUCCESS:
      return state.merge({
        items: action.items,
        isFetching: false,
        error: null,
      });
    case UPDATE_NEW_ITEM_NAME:
      return state.set('newItemName', action.newItemName);
    case CREATE_ITEM_SUCCESS: {
      return state.merge({
        items: state.get('items').set(action.item.get('id'), action.item),
        newItemName: '',
      });
    }
    case DELETE_ITEM:
      return state.deleteIn(['items', action.itemId]);
    case API_SERVICE_FAILURE:
      return state.merge({
        isFetching: false,
        error: action.error,
      });
    default:
      return state;
  }
}

export const fetchItems = idToken => (
  {
    type: FETCH_ITEMS,
    idToken,
  }
);

export const fetchItemsSuccess = items => (
  {
    type: FETCH_ITEMS_SUCCESS,
    items,
  }
);

export const updateNewItemName = newItemName => (
  {
    type: UPDATE_NEW_ITEM_NAME,
    newItemName,
  }
);

export const createItem = (idToken, newItem) => (
  {
    type: CREATE_ITEM,
    idToken,
    newItem,
  }
);

export const createItemSuccess = item => (
  {
    type: CREATE_ITEM_SUCCESS,
    item,
  }
);

export const deleteItem = (idToken, itemId) => (
  {
    type: DELETE_ITEM,
    idToken,
    itemId,
  }
);
