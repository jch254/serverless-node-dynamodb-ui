import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Flex } from 'reflexbox';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import AppFooter from '../shared-components/AppFooter';
import Navbar from '../shared-components/Navbar';
import { actions as authActions, selectors as authSelectors } from '../auth';
import HomePage from '../shared-components/HomePage';
import AboutPage from '../shared-components/AboutPage';
import ItemsPage from '../items/ItemsPage';
import NotFoundPage from '../shared-components/NotFoundPage';
import ScrollToTop from '../shared-components/ScrollToTop';
import GaTracker from '../shared-components/GaTracker';
import RestrictedPage from '../auth/RestrictedPage';

const App = ({ history, isLoggedIn, actions }) => (
  <ConnectedRouter history={history}>
    <GaTracker>
      <ScrollToTop>
        <Flex column style={{ height: '100%' }}>
          <Navbar isLoggedIn={isLoggedIn} onLogin={actions.login} onLogout={actions.logout} />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/items">
              <RestrictedPage>
                <ItemsPage />
              </RestrictedPage>
            </Route>
            <Route component={NotFoundPage} />
          </Switch>
          <AppFooter />
        </Flex>
      </ScrollToTop>
    </GaTracker>
  </ConnectedRouter>
);

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    isLoggedIn: authSelectors.getIsLoggedIn(state),
  }
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators({ ...authActions }, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
