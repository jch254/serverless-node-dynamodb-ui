import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import {
  NavItem,
  Toolbar,
  Space,
} from 'rebass';
import Icon from 'react-geomicons';

import styles from './Navbar.css';

const Navbar = ({ currentPath }) => (
  <Toolbar backgroundColor="white" mt={1} mb={2}>
    <Space auto />
    <NavItem is="object" color="midgray">
      <Link to="/">
        <Icon
          name="home"
          width="32px"
          height="32px"
          fill={currentPath === '/' ? '#999' : 'currentColor'}
          className={styles.navItem}
        />
      </Link>
    </NavItem>
    <Space auto />
    <NavItem is="object" color="midgray">
      <Link to="/items">
        <Icon
          name="list"
          width="32px"
          height="32px"
          fill={currentPath === '/items' ? '#999' : 'currentColor'}
          className={styles.navItem}
        />
      </Link>
    </NavItem>
    <Space auto />
    <NavItem is="object" color="midgray">
      <Link to="/about">
        <Icon
          name="info"
          width="32px"
          height="32px"
          fill={currentPath === '/about' ? '#999' : 'currentColor'}
          className={styles.navItem}
        />
      </Link>
    </NavItem>
    <Space auto />
  </Toolbar>
);

Navbar.propTypes = {
  currentPath: PropTypes.string.isRequired,
};

export default Navbar;
