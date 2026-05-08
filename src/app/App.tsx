import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { Flex } from 'reflexbox';

import RestrictedPage from '../auth/LoadableRestrictedPage';
import { loginRequest, logout } from '../auth/reducer';
import { getIsLoggedIn } from '../auth/selectors';
import ItemsPage from '../items/ItemsPage';
import { setNavigator } from '../navigation';
import { GlobalState } from '../rootReducer';
import AppFooter from '../shared-components/AppFooter';
import GaTracker from '../shared-components/GaTracker';
import HomePage from '../shared-components/HomePage';
import AboutPage from '../shared-components/LoadableAboutPage';
import NotFoundPage from '../shared-components/LoadableNotFoundPage';
import Navbar from '../shared-components/Navbar';
import ScrollToTop from '../shared-components/ScrollToTop';

interface StateProps {
  isLoggedIn: boolean;
}

interface DispatchProps {
  actions: {
    loginRequest: typeof loginRequest,
    logout: typeof logout,
  };
}

const App: React.FC<StateProps & DispatchProps> = ({ isLoggedIn, actions }) => (
  <GaTracker>
    <ScrollToTop>
      <Flex column style={{ height: '100%' }}>
        <Navbar isLoggedIn={isLoggedIn} onLogin={actions.loginRequest} onLogout={actions.logout} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/items"
            element={
              <RestrictedPage>
                <ItemsPage />
              </RestrictedPage>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <AppFooter />
      </Flex>
    </ScrollToTop>
  </GaTracker>
);

const NavigationBinder: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    setNavigator(navigate);

    return () => setNavigator(undefined);
  }, [navigate]);

  return null;
};

const AppWithNavigation: React.FC<StateProps & DispatchProps> = (props) => (
  <>
    <NavigationBinder />
    <App {...props} />
  </>
);

const mapStateToProps = (state: GlobalState): StateProps => ({
  isLoggedIn: getIsLoggedIn(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  actions: bindActionCreators({ loginRequest, logout }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigation);
