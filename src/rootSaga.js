import { fork } from 'redux-saga/effects';

import { sagas as itemsSagas } from './items';

export default function* rootSaga() {
  yield [
    fork(itemsSagas.watchFetchItems),
    fork(itemsSagas.watchCreateItem),
    fork(itemsSagas.watchDeleteItem),
  ];
}
