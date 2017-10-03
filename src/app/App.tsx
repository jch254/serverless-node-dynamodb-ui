import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Flex } from 'rebass';
import { bindActionCreators, Dispatch } from 'redux';

import RestrictedPage from '../auth/LoadableRestrictedPage';
import { loginRequest, logout } from '../auth/reducer';
import { getIsLoggedIn } from '../auth/selectors';
import ItemsPage from '../items/ItemsPage';
import { GlobalState } from '../rootReducer';
import AppFooter from '../shared-components/AppFooter';
import GaTracker from '../shared-components/GaTracker';
import HomePage from '../shared-components/HomePage';
import AboutPage from '../shared-components/LoadableAboutPage';
import NotFoundPage from '../shared-components/LoadableNotFoundPage';
import Navbar from '../shared-components/Navbar';
import ScrollToTop from '../shared-components/ScrollToTop';

interface AppProps {
  history: History;
}

interface StateProps {
  isLoggedIn: boolean;
}

interface DispatchProps {
  actions: {
    loginRequest: typeof loginRequest,
    logout: typeof logout,
  };
}

const App: React.StatelessComponent<AppProps & StateProps & DispatchProps> = ({ history, isLoggedIn, actions }) => (
  <ConnectedRouter history={history}>
    <GaTracker>
      <ScrollToTop>
        <Flex column style={{ height: '100%' }}>
          <Navbar isLoggedIn={isLoggedIn} onLogin={actions.loginRequest} onLogout={actions.logout} />
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

const mapStateToProps = (state: GlobalState, ownProps: AppProps): StateProps => ({
  isLoggedIn: getIsLoggedIn(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  actions: bindActionCreators({ loginRequest, logout }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
