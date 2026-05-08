import * as React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Flex } from 'reflexbox';

import { useAuth0 } from '../auth/Auth0Wrapper';
import PrivateRoute from '../auth/PrivateRoute';
import ItemsPage from '../items/ItemsPage';
import { setNavigator } from '../navigation';
import AppFooter from '../shared-components/AppFooter';
import FullscreenLoader from '../shared-components/FullscreenLoader';
import GaTracker from '../shared-components/GaTracker';
import HomePage from '../shared-components/HomePage';
import AboutPage from '../shared-components/LoadableAboutPage';
import NotFoundPage from '../shared-components/LoadableNotFoundPage';
import Navbar from '../shared-components/Navbar';
import ScrollToTop from '../shared-components/ScrollToTop';

const App: React.FC = () => {
  const { isLoggingIn, loginWithRedirect, logout, user } = useAuth0();

  return (
    <GaTracker>
      <ScrollToTop>
        {
          isLoggingIn ?
            <FullscreenLoader delay={0} /> :
            <Flex column style={{ height: '100%' }}>
              <Navbar
                user={user}
                handleLogin={() => loginWithRedirect({ appState: { targetUrl: '/items' } })}
                handleLogout={() => logout({ returnTo: window.location.origin, client_id: process.env.AUTH0_CLIENT_ID })}
              />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/items" element={<PrivateRoute path="/items" component={ItemsPage} />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              <AppFooter />
            </Flex>
        }
      </ScrollToTop>
    </GaTracker>
  );
};

const NavigationBinder: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    setNavigator(navigate);

    return () => setNavigator(undefined);
  }, [navigate]);

  return null;
};

const AppWithNavigation: React.FC = () => (
  <>
    <NavigationBinder />
    <App />
  </>
);

export default AppWithNavigation;
