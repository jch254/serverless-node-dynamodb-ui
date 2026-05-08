import { LogoutOptions, RedirectLoginOptions } from '@auth0/auth0-spa-js';
import * as React from 'react';
import Icon from 'react-geomicons';
import { NavLink } from 'react-router-dom';
import {
  NavItem,
  Space,
  Toolbar,
} from 'rebass';

const styles = require('./Navbar.css');

interface NavbarProps {
  user?: any;
  handleLogin: (options?: RedirectLoginOptions) => Promise<void>;
  handleLogout: (options?: LogoutOptions) => void;
}

const navStyle = {
  color: 'black',
};

const activeStyle = {
  color: 'rgb(136, 136, 136)',
};

const getNavStyle = ({ isActive }: { isActive: boolean }) => isActive ? activeStyle : navStyle;

const Navbar: React.FC<NavbarProps> = ({ user, handleLogin, handleLogout }) => {
  const isLoggedIn = user !== undefined;

  return (
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
      {isLoggedIn && <Space auto />}
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
            onClick={isLoggedIn ? () => handleLogout({ returnTo: window.location.origin }) : () => handleLogin()}
          />
        </div>
      </NavItem>
      <Space auto />
    </Toolbar>
  );
};

export default Navbar;
