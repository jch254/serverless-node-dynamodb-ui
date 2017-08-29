import { call, put, take } from 'redux-saga/effects';

import {
  createItem,
  deleteItem,
  fetchItems,
  handleApiError,
} from '../apiService';

import Item, { ItemArgs } from './Item';
import {
  createItemError,
  createItemSuccess,
  deleteItemError,
  deleteItemSuccess,
  fetchItemsError,
  fetchItemsSuccess,
  CreateItem,
  CREATE_ITEM,
  DeleteItem,
  DELETE_ITEM,
  FetchItems,
  FETCH_ITEMS,
} from './reducer';

export function* fetchItemsSaga(idToken: string) {
  try {
    const items: Map<string, Item> = yield call(fetchItems, idToken);

    yield put(fetchItemsSuccess(items));
  } catch (error) {
    yield call(handleApiError, error, fetchItemsError);
  }
}

export function* watchFetchItems() {
  while (true) {
    const { idToken }: FetchItems = yield take(FETCH_ITEMS);

    yield call(fetchItemsSaga, idToken);
  }
}

export function* createItemSaga(idToken: string, newItem: Partial<ItemArgs>) {
  try {
    const item: Item = yield call(createItem, idToken, newItem);

    yield put(createItemSuccess(item));
  } catch (error) {
    yield call(handleApiError, error, createItemError);
  }
}

export function* watchCreateItem() {
  while (true) {
    const { idToken, newItem }: CreateItem = yield take(CREATE_ITEM);

    yield call(createItemSaga, idToken, newItem);
  }
}

export function* deleteItemSaga(idToken: string, itemId: string) {
  try {
    yield call(deleteItem, idToken, itemId);

    yield put(deleteItemSuccess());
  } catch (error) {
    yield call(handleApiError, error, deleteItemError);
  }
}

export function* watchDeleteItem() {
  while (true) {
    const { idToken, itemId }: DeleteItem = yield take(DELETE_ITEM);

    yield call(deleteItemSaga, idToken, itemId);
  }
}
