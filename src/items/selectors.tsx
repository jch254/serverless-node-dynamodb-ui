import { createSelector } from 'reselect';

import { ResponseError } from '../apiService';
import { GlobalState } from '../rootReducer';
import Item from './Item';

export const getError = (state: GlobalState): ResponseError | null => state.items.error;

export const getIsFetching = (state: GlobalState): boolean => state.items.isFetching;

const getItems = (state: GlobalState): Map<string, Item> => state.items.items;

export const getSortedItems = createSelector(
  [getItems],
  items => new Map<string, Item>(
    [...items].sort(([idA, ItemA], [idB, ItemB]) => ItemB.createdUtc.diff(ItemA.createdUtc)),
  ),
);
