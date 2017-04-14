import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  NavItem,
  Toolbar,
  Space,
} from 'rebass';
import Icon from 'react-geomicons';

import styles from './Navbar.css';

const Navbar = ({ isLoggedIn, onLogin, onLogout }) => (
  <Toolbar backgroundColor="white" mt={1} mb={2}>
    <Space auto />
    <NavItem is="object" color="black">
      <NavLink to="/" exact activeStyle={{ color: 'rgb(136, 136, 136)' }}>
        <Icon
          name="home"
          width="32px"
          height="32px"
          className={styles.navItem}
        />
      </NavLink>
    </NavItem>
    <Space auto />
    <NavItem is="object" color="black">
      <NavLink to="/about" activeStyle={{ color: 'rgb(136, 136, 136)' }}>
        <Icon
          name="info"
          width="32px"
          height="32px"
          className={styles.navItem}
        />
      </NavLink>
    </NavItem>
    <Space auto />
    {
      isLoggedIn &&
      <NavItem is="object" color="black">
        <NavLink to="/items" activeStyle={{ color: 'rgb(136, 136, 136)' }}>
          <Icon
            name="list"
            width="32px"
            height="32px"
            className={styles.navItem}
          />
        </NavLink>
      </NavItem>
    }
    { isLoggedIn && <Space auto /> }
    <NavItem is="object" color="black" onClick={() => (isLoggedIn ? onLogout() : onLogin())}>
      <Icon
        name="user"
        width="32px"
        height="32px"
        className={styles.navItem}
      />
    </NavItem>
    <Space auto />
  </Toolbar>
);

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
