import iassign from 'immutable-assign';
import 'isomorphic-fetch';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './app/App';
import { configureStore } from './configureStore';

require('./index.css');

iassign.setOption({
  freeze: process.env.NODE_ENV !== 'production',
  copyFunc: (value: any, _propName: string) => {
    if (value instanceof Map) {
      return new Map(value) as any;
    }

    return undefined;
  },
});

// Add ES6 Map support for redux-devtools-extension
// See: https://github.com/zalmoxisus/redux-devtools-extension/issues/124
if (process.env.NODE_ENV !== 'production') {
  require('map.prototype.tojson');
}

const store = configureStore();

declare global {
  interface Window {
    devToolsExtension: any;
  }
}

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
