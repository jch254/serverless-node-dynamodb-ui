import * as iassign from 'immutable-assign';

import { ResponseError } from '../apiService';

import Item, { ItemArgs } from './Item';

export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_ERROR = 'FETCH_ITEMS_ERROR';
export const CREATE_ITEM = 'CREATE_ITEM';
export const CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS';
export const CREATE_ITEM_ERROR = 'CREATE_ITEM_ERROR';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_ERROR = 'DELETE_ITEM_ERROR';

export interface FetchItems {
  type: 'FETCH_ITEMS';
  idToken: string;
}

export interface FetchItemsSuccess {
  type: 'FETCH_ITEMS_SUCCESS';
  items: Map<string, Item>;
}

export interface FetchItemsError {
  type: 'FETCH_ITEMS_ERROR';
  error: ResponseError;
}

export interface CreateItem {
  type: 'CREATE_ITEM';
  idToken: string;
  newItem: Partial<ItemArgs>;
}

export interface CreateItemSuccess {
  type: 'CREATE_ITEM_SUCCESS';
  item: Item;
}

export interface CreateItemError {
  type: 'CREATE_ITEM_ERROR';
  error: ResponseError;
}

export interface DeleteItem {
  type: 'DELETE_ITEM';
  idToken: string;
  itemId: string;
}

export interface DeleteItemSuccess {
  type: 'DELETE_ITEM_SUCCESS';
}

export interface DeleteItemError {
  type: 'DELETE_ITEM_ERROR';
  error: ResponseError;
}

type ItemsAction =
  FetchItems |
  FetchItemsSuccess |
  FetchItemsError |
  CreateItem |
  CreateItemSuccess |
  CreateItemError |
  DeleteItem |
  DeleteItemSuccess |
  DeleteItemError;

export interface ItemsState {
  isFetching: boolean;
  isCreating: boolean;
  isDeleting: boolean;
  items: Map<string, Item>;
  error: ResponseError | null;
}

export const initialState: ItemsState = {
  isFetching: false,
  isCreating: false,
  isDeleting: false,
  items: new Map<string, Item>(),
  error: null,
};

export default function reducer(state: ItemsState = initialState, action: ItemsAction) {
  switch (action.type) {
    case FETCH_ITEMS:
      return iassign(
        state,
        state => state.isFetching,
        () => true,
      );
    case FETCH_ITEMS_SUCCESS:
      return iassign(
        state,
        (s) => {
          s.isFetching = false;
          s.items = action.items;

          return s;
        },
      );
    case FETCH_ITEMS_ERROR:
      return iassign(
        state,
        (s) => {
          s.isFetching = false;
          s.error = action.error;

          return s;
        },
      );
    case CREATE_ITEM:
      return iassign(
        state,
        state => state.isCreating,
        () => true,
      );
    case CREATE_ITEM_SUCCESS: {
      return iassign(
        state,
        (s) => {
          s.isCreating = false;
          s.items = iassign(
            s.items,
            items => items.set(action.item.id, action.item),
          );

          return s;
        },
      );
    }
    case CREATE_ITEM_ERROR:
      return iassign(
        state,
        (s) => {
          s.isFetching = false;
          s.error = action.error;

          return s;
        },
      );
    case DELETE_ITEM:
      return iassign(
        state,
        (s) => {
          s.isDeleting = false;
          s.items = iassign(
            s.items,
            (items) => {
              items.delete(action.itemId);

              return items;
            },
          );
          
          return s;
        },
      );
    case DELETE_ITEM_SUCCESS:
      return iassign(
        state,
        state => state.isDeleting,
        () => false,
      );
    case DELETE_ITEM_ERROR:
      return iassign(
        state,
        (s) => {
          s.isFetching = false;
          s.error = action.error;

          return s;
        },
      );
    default:
      return state;
  }
}

export const fetchItems = (idToken: string): FetchItems => ({
  type: FETCH_ITEMS,
  idToken,
});

export const fetchItemsSuccess = (items: Map<string, Item>) => ({
  type: FETCH_ITEMS_SUCCESS,
  items,
});

export const fetchItemsError = (error: ResponseError): FetchItemsError => ({
  type: FETCH_ITEMS_ERROR,
  error,
});

export const createItem = (idToken: string, newItem: Partial<ItemArgs>): CreateItem => ({
  type: CREATE_ITEM,
  idToken,
  newItem,
});

export const createItemSuccess = (item: Item): CreateItemSuccess => ({
  type: CREATE_ITEM_SUCCESS,
  item,
});

export const createItemError = (error: ResponseError): CreateItemError => ({
  type: CREATE_ITEM_ERROR,
  error,
});

export const deleteItem = (idToken: string, itemId: string): DeleteItem => ({
  type: DELETE_ITEM,
  idToken,
  itemId,
});

export const deleteItemSuccess = (): DeleteItemSuccess => ({
  type: DELETE_ITEM_SUCCESS,
});

export const deleteItemError = (error: ResponseError): DeleteItemError => ({
  type: DELETE_ITEM_ERROR,
  error,
});
