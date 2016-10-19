import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './app/App';
import HomePage from './shared-components/HomePage';
import ItemsPage from './items/ItemsPage';
import AboutPage from './shared-components/AboutPage';
import NotFoundPage from './shared-components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="items" component={ItemsPage} />
    <Route path="about" component={AboutPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
