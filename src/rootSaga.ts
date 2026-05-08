import { fork } from 'redux-saga/effects';

import { watchCreateItem, watchDeleteItem, watchFetchItems } from './items/sagas';

export default function* rootSaga() {
  yield [
    fork(watchFetchItems),
    fork(watchCreateItem),
    fork(watchDeleteItem),
  ];
}
