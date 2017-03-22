import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './app/App';
import HomePage from './shared-components/HomePage';
import AboutPage from './shared-components/AboutPage';
import RestrictedPage from './auth/RestrictedPage';
import ItemsPage from './items/ItemsPage';
import NotFoundPage from './shared-components/NotFoundPage';

export default (
  <Route
    path="/"
    component={App}
    onChange={(prevState, nextState) => {
      if (nextState.location.action !== 'POP') {
        window.scrollTo(0, 0);
      }
    }}
  >
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
    <Route component={RestrictedPage}>
      <Route path="items" component={ItemsPage} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
