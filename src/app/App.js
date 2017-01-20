import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Flex } from 'reflexbox';

import AppFooter from '../shared-components/AppFooter';
import Navbar from '../shared-components/Navbar';
import { actions as authActions, selectors as authSelectors } from '../auth';

const App = ({ children, isLoggedIn, actions, location }) => (
  <Flex column style={{ height: '100%' }}>
    <Navbar currentPath={location.pathname} isLoggedIn={isLoggedIn} onLogin={actions.login} onLogout={actions.logout} />
    {children}
    <AppFooter />
  </Flex>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
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
