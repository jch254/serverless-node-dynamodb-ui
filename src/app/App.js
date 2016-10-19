import React, { PropTypes } from 'react';
import { Flex } from 'reflexbox';

import AppFooter from '../shared-components/AppFooter';
import Navbar from '../shared-components/Navbar';

const App = ({ children, location }) => (
  <Flex column style={{ height: '100%' }}>
    <Navbar currentPath={location.pathname} />
    {children}
    <AppFooter />
  </Flex>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default App;
