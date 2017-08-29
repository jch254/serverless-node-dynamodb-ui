import { fork } from 'redux-saga/effects';

import { watchLoginFailure, watchLoginRequest, watchLoginSuccess, watchLogout } from './auth/sagas';
import { watchCreateItem, watchDeleteItem, watchFetchItems } from './items/sagas';

export default function* rootSaga() {
  yield [
    fork(watchLoginRequest),
    fork(watchLoginSuccess),
    fork(watchLoginFailure),
    fork(watchLogout),
    fork(watchFetchItems),
    fork(watchCreateItem),
    fork(watchDeleteItem),
  ];
}
