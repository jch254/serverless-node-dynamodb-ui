import 'isomorphic-fetch';
import { Action } from 'redux';
import { put } from 'redux-saga/effects';

import { loginRequest } from './auth/reducer';
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
  try {
    const response = await fetch(`${baseUri}/items`, getFetchInit('GET', idToken));

    if (response.ok) {
      const json = await response.json();

      return new Map<string, Item>(json.items.map((item: ItemArgs) => [item.id, new Item(item)]));
    }

    await handleFetchErrorResponse(response);

    return new Map<string, Item>();
  } catch (err) {
    throw err;
  }
}

export async function createItem(idToken: string, item: Partial<ItemArgs>): Promise<Item> {
  try {
    const response = await fetch(`${baseUri}/items`, getFetchInit('POST', idToken, item));

    if (response.status === 201) {
      const json = await response.json();

      return new Item(json);
    }

    await handleFetchErrorResponse(response);

    return new Item();
  } catch (err) {
    throw err;
  }
}

export async function deleteItem(idToken: string, itemId: string): Promise<void> {
  try {
    const response = await fetch(`${baseUri}/items/${itemId}`, getFetchInit('DELETE', idToken));

    if (response.ok) {
      return;
    }

    await handleFetchErrorResponse(response);
  } catch (err) {
    throw err;
  }
}

export interface ResponseError extends Error {
  response?: Response;
}

export function* handleApiError(error: ResponseError, failureAction: (error: ResponseError | null) => Action) {
  const response = error.response;

  if (response !== undefined) {
    if (response.status === 401) {
      // Unauthorised - show login
      yield put(failureAction(null));
      yield put(loginRequest());
    }
  } else {
    yield put(failureAction(error));
  }
}
