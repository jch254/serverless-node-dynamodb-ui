import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { Iterable } from 'immutable';

import { reducer as authReducer } from './auth';
import { reducer as itemsReducer } from './items';
import rootSaga from './rootSaga';

const reducer = combineReducers(
  {
    auth: authReducer,
    items: itemsReducer,
    router: routerReducer,
  },
);

export default function configureStore(history, initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  if (process.env.NODE_ENV !== 'production') {
    // Log Immutable state beautifully
    const logger = createLogger({
      stateTransformer: (state) => {
        const beautifulState = {};

        Object.keys(state).forEach((key) => {
          if (Iterable.isIterable(state[key])) {
            beautifulState[key] = state[key].toJS();
          } else {
            beautifulState[key] = state[key];
          }
        });

        return beautifulState;
      },
    });

    middlewares.push(logger);
  }

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension &&
      process.env.NODE_ENV !== 'production' ? window.devToolsExtension() : f => f,
  ));

  sagaMiddleware.run(rootSaga);
  return store;
}
