import { Auth0Client } from '@auth0/auth0-spa-js';
import { Action } from 'redux';
import { put, select } from 'redux-saga/effects';

import { getAuth0Client } from './auth/selectors';
import Item, { ItemArgs } from './items/Item';

const baseUri = process.env.API_BASE_URI;

const getFetchInit = (requestMethod: string, idToken?: string, body?: any): RequestInit => {
  const requestHeaders = new Headers();

  if (idToken) {
    requestHeaders.append('Authorization', `Bearer ${idToken}`);
  }

  requestHeaders.append('Content-Type', 'application/json');

  const fetchInit = { method: requestMethod, headers: requestHeaders } as RequestInit;

  if (body) {
    fetchInit.body = JSON.stringify(body);
  }

  return fetchInit;
};

export async function handleFetchErrorResponse(response: Response): Promise<void> {
  const err: ResponseError = new Error();

  err.response = response;

  throw err;
}

export async function fetchItems(idToken: string): Promise<Map<string, Item>> {
  const response = await fetch(`${baseUri}/items`, getFetchInit('GET', idToken));

  if (response.ok) {
    const json = await response.json();

    return new Map<string, Item>(json.items.map((item: ItemArgs) => [item.id, new Item(item)]));
  }

  await handleFetchErrorResponse(response);

  return new Map<string, Item>();
}

export async function createItem(idToken: string, item: Partial<ItemArgs>): Promise<Item> {
  const response = await fetch(`${baseUri}/items`, getFetchInit('POST', idToken, item));

  if (response.status === 201) {
    const json = await response.json();

    return new Item(json);
  }

  await handleFetchErrorResponse(response);

  return new Item();
}

export async function deleteItem(idToken: string, itemId: string): Promise<void> {
  const response = await fetch(`${baseUri}/items/${itemId}`, getFetchInit('DELETE', idToken));

  if (response.ok) {
    return;
  }

  await handleFetchErrorResponse(response);
}

export interface ResponseError extends Error {
  response?: Response;
}

export function* handleApiError(error: ResponseError, failureAction: (error: ResponseError) => Action) {
  const response = error.response;

  if (response !== undefined) {
    if (response.status === 401) {
      yield put(failureAction(error));

      const auth0Client: Auth0Client | undefined = yield select(getAuth0Client);
      const path = window.location.pathname;

      if (auth0Client) {
        auth0Client.loginWithRedirect({ appState: { targetUrl: path } });
      }
    }
  } else {
    yield put(failureAction(error));
  }
}
