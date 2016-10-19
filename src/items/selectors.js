import { createSelector } from 'reselect';

export const getError = state => state.items.get('error');

export const getIsFetching = state => state.items.get('isFetching');

const getItems = state => state.items.get('items');

export const getSortedItems = createSelector(
  [getItems],
  items => items.sortBy(i => i.get('createdUtc')).reverse()
);

export const getNewItemName = state => state.items.get('newItemName');
