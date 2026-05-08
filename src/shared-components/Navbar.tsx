import * as React from 'react';
import Icon from 'react-geomicons';
import { NavLink } from 'react-router-dom';
import {
  NavItem,
  Space,
  Toolbar,
} from 'rebass';

import { loginRequest, logout } from '../auth/reducer';

const styles = require('./Navbar.css');

interface NavbarProps {
  onLogin: typeof loginRequest;
  onLogout: typeof logout;
  isLoggedIn: boolean;
}

const navStyle = {
  color: 'black',
};

const activeStyle = {
  color: 'rgb(136, 136, 136)',
};

const getNavStyle = ({ isActive }: { isActive: boolean }) => isActive ? activeStyle : navStyle;

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogin, onLogout }) => (
  <Toolbar backgroundColor="white" mt={1} mb={2}>
    <Space auto />
    <NavItem is="object">
      <NavLink to="/" end style={getNavStyle} title="Home">
        <Icon
          name="home"
          width="32px"
          height="32px"
          className={styles.navItem}
        />
      </NavLink>
    </NavItem>
    <Space auto />
    {
      isLoggedIn &&
      <NavItem is="object">
        <NavLink to="/items" style={getNavStyle} title="Your Items/Tings">
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
    <NavItem is="object">
      <NavLink to="/about" style={getNavStyle} title="About">
        <Icon
          name="info"
          width="32px"
          height="32px"
          className={styles.navItem}
        />
      </NavLink>
    </NavItem>
    <Space auto />
    <NavItem is="object" color="black">
      <div title={isLoggedIn ? 'Logout' : 'Login'}>
        <Icon
          name="user"
          width="32px"
          height="32px"
          className={styles.navItem}
          onClick={isLoggedIn ? onLogout : onLogin}
        />
      </div>
    </NavItem>
    <Space auto />
  </Toolbar>
);

export default Navbar;
