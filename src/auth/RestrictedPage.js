import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import functional from 'react-functional';

import { login } from './reducer';
import { getIsLoggedIn } from './selectors';

const RestrictedPage = ({ children, isLoggedIn }) => (isLoggedIn ? children : <div />);

RestrictedPage.propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

RestrictedPage.componentWillMount = ({ actions, isLoggedIn }) => {
  if (!isLoggedIn) {
    actions.login();
  }
};

const mapStateToProps = state => (
  {
    isLoggedIn: getIsLoggedIn(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators({ login }, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(functional(RestrictedPage));
