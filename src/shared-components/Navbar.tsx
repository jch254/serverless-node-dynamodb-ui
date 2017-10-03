import * as React from 'react';
// import Icon from 'react-geomicons';
import { NavLink } from 'react-router-dom';
import { Toolbar } from 'rebass';

import { loginRequest, logout } from '../auth/reducer';

// const styles = require('./Navbar.css');

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

const Navbar: React.StatelessComponent<NavbarProps> = ({ isLoggedIn, onLogin, onLogout }) => (
  <Toolbar bg="white" mt={1} mb={2}>
    <NavLink to="/" exact style={navStyle} activeStyle={activeStyle} title="Home">
      {/* <Icon
        name="home"
        width="32px"
        height="32px"
        className={styles.navItem}
      /> */}
    </NavLink>
    {
      isLoggedIn &&
      <NavLink to="/items" style={navStyle} activeStyle={activeStyle} title="Your Items/Tings">
        {/* <Icon
          name="list"
          width="32px"
          height="32px"
          className={styles.navItem}
        /> */}
      </NavLink>
    }
    <NavLink to="/about" style={navStyle} activeStyle={activeStyle} title="About">
      {/* <Icon
        name="info"
        width="32px"
        height="32px"
        className={styles.navItem}
      /> */}
    </NavLink>
    <div title={isLoggedIn ? 'Logout' : 'Login'}>
      {/* <Icon
        name="user"
        width="32px"
        height="32px"
        className={styles.navItem}
        onClick={isLoggedIn ? onLogout : onLogin}
      /> */}
    </div>
  </Toolbar>
);

export default Navbar;
