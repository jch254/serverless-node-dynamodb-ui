import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddleware);
  const enhancer = process.env.NODE_ENV !== 'production' ?
    composeWithDevTools(middleware) :
    middleware;

  const store = createStore(rootReducer, enhancer);

  sagaMiddleware.run(rootSaga);

  return store;
}
