import 'isomorphic-fetch';
import { Map } from 'immutable';
import { put } from 'redux-saga/effects';

import { Item } from './items';
import { actions as authActions } from './auth';

const getFetchInit = (idToken, requestMethod, body) => {
  const requestHeaders = new Headers();

  requestHeaders.append('Authorization', `Bearer ${idToken}`);
  requestHeaders.append('Content-Type', 'application/json');

  const fetchInit = { method: requestMethod, headers: requestHeaders };

  if (body) {
    fetchInit.body = JSON.stringify(body);
  }

  return fetchInit;
};


const mapItemToKeyValuePair = item => [item.id, new Item(item)];

const handleErrorResponse = (response) => {
  const err = new Error();

  err.response = response;

  throw err;
};

export async function fetchItems(idToken) {
  try {
    const response = await fetch(`${process.env.API_BASE_URI}/items`, getFetchInit(idToken, 'GET'));

    if (response.ok) {
      const json = await response.json();

      return { items: new Map(json.items.map(mapItemToKeyValuePair)) };
    }

    return handleErrorResponse(response);
  } catch (err) {
    throw err;
  }
}

export async function createItem(idToken, item) {
  try {
    const response = await fetch(`${process.env.API_BASE_URI}/items`, getFetchInit(idToken, 'POST', item));

    if (response.status === 201) {
      const json = await response.json();

      return { item: new Item(json) };
    }

    return handleErrorResponse(response);
  } catch (err) {
    throw err;
  }
}

export async function deleteItem(idToken, itemId) {
  try {
    const response = await fetch(`${process.env.API_BASE_URI}/items/${itemId}`, getFetchInit(idToken, 'DELETE'));

    if (response.ok) {
      return true;
    }

    return handleErrorResponse(response);
  } catch (err) {
    throw err;
  }
}

export function* handleApiError(error, failureAction) {
  const response = error.response;

  if (response === undefined) {
    yield put(failureAction('Oh damn! An error occurred, please contact the administrator.'));
  } else if (response.status === 401) {
    yield put(authActions.login());
  } else {
    yield put(failureAction('Oh snap! An error occurred, please contact the administrator.'));
  }
}
