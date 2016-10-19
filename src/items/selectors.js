export const getError = state => state.items.get('error');

export const getIsFetching = state => state.items.get('isFetching');

export const getItems = state => state.items.get('items').sortBy(i => i.get('createdUtc')).reverse();

export const getNewItemName = state => state.items.get('newItemName');
