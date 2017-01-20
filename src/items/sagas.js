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

export function* fetchItemsSaga(idToken) {
  try {
    const { items } = yield call(fetchItems, idToken);

    yield put(fetchItemsSuccess(items));
  } catch (error) {
    yield call(handleApiError, error, apiServiceFailure);
  }
}

export function* watchFetchItems() {
  while (true) {
    const { idToken } = yield take(FETCH_ITEMS);
    yield call(fetchItemsSaga, idToken);
  }
}

export function* createItemSaga(idToken, newItem) {
  try {
    const { item } = yield call(createItem, idToken, newItem);

    yield put(createItemSuccess(item));
  } catch (error) {
    yield call(handleApiError, error, apiServiceFailure);
  }
}

export function* watchCreateItem() {
  while (true) {
    const { idToken, newItem } = yield take(CREATE_ITEM);
    yield call(createItemSaga, idToken, newItem);
  }
}

export function* deleteItemSaga(idToken, itemId) {
  try {
    yield call(deleteItem, idToken, itemId);
  } catch (error) {
    yield call(handleApiError, error, apiServiceFailure);
  }
}

export function* watchDeleteItem() {
  while (true) {
    const { idToken, itemId } = yield take(DELETE_ITEM);
    yield call(deleteItemSaga, idToken, itemId);
  }
}
