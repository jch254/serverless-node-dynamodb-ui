import 'isomorphic-fetch';
import Immutable, { Map } from 'immutable';
import { put } from 'redux-saga/effects';

import { Item } from './items';

const getFetchInit = (requestMethod, body) => {
  const requestHeaders = new Headers();
  requestHeaders.append('Content-Type', 'application/json');

  const fetchInit = { method: requestMethod, headers: requestHeaders };

  if (body) {
    fetchInit.body = JSON.stringify(body);
  }

  return fetchInit;
};

const mapItemToKeyValuePair = item => [item.id, new Item(item)];

export async function fetchItems() {
  const response = await fetch(`${process.env.API_BASE_URI}/items`, getFetchInit('GET'));

  try {
    const json = await response.json();

    return { items: new Map(json.items.map(mapItemToKeyValuePair)) };
  } catch (err) {
    throw new Error(`${response.statusText} (${response.status}) error occurred downstream: ${err.message}`);
  }
}

export async function createItem(item) {
  const response = await fetch(`${process.env.API_BASE_URI}/items`, getFetchInit('POST', item));

  try {
    const json = await response.json();

    return { item: Immutable.fromJS(json) };
  } catch (err) {
    throw new Error(`${response.statusText} (${response.status}) error occurred downstream: ${err.message}`);
  }
}

export async function deleteItem(itemId) {
  const response = await fetch(`${process.env.API_BASE_URI}/items/${itemId}`, getFetchInit('DELETE'));

  try {
    const json = await response.json();

    return { item: Immutable.fromJS(json) };
  } catch (err) {
    throw new Error(`${response.statusText} (${response.status}) error occurred downstream: ${err.message}`);
  }
}

export function* handleApiError(error, failureAction) {
  const response = error.response;

  if (response === undefined) {
    yield put(failureAction(error.message));
  } else {
    const responseError = {
      status: response.status,
      statusText: response.statusText,
      message: error.message,
    };

    yield put(failureAction(responseError));
  }
}
