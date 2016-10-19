import { call, put, take } from 'redux-saga/effects';

import {
  FETCH_ITEMS,
  CREATE_ITEM,
  DELETE_ITEM,
  fetchItemsSuccess,
  createItemSuccess,
} from './reducer';

import {
  apiServiceFailure,
} from '../app/actions';

import { fetchItems, createItem, deleteItem, handleApiError } from '../apiService';

export function* fetchItemsSaga() {
  try {
    const { items } = yield call(fetchItems);

    yield put(fetchItemsSuccess(items));
  } catch (error) {
    yield call(handleApiError, error, apiServiceFailure);
  }
}

export function* watchFetchItems() {
  while (true) {
    yield take(FETCH_ITEMS);
    yield call(fetchItemsSaga);
  }
}

export function* createItemSaga(newItem) {
  try {
    const { item } = yield call(createItem, newItem);

    yield put(createItemSuccess(item));
  } catch (error) {
    yield call(handleApiError, error, apiServiceFailure);
  }
}

export function* watchCreateItem() {
  while (true) {
    const { newItem } = yield take(CREATE_ITEM);
    yield call(createItemSaga, newItem);
  }
}

export function* deleteItemSaga(itemId) {
  try {
    yield call(deleteItem, itemId);
  } catch (error) {
    yield call(handleApiError, error, apiServiceFailure);
  }
}

export function* watchDeleteItem() {
  while (true) {
    const { itemId } = yield take(DELETE_ITEM);
    yield call(deleteItemSaga, itemId);
  }
}
