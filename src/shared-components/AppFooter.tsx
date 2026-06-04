import moment from 'moment';
import * as React from 'react';
import {
  NavItem,
  Space,
  Toolbar,
} from 'rebass';

const AppFooter: React.FC<{}> = () => (
  <Toolbar backgroundColor="white">
    <Space auto />
    <NavItem style={{ fontWeight: 'normal', fontSize: '12px' }}>
      <a href="https://jch254.com" style={{ cursor: 'pointer', color: 'black' }}>
        {`© Jordan Hornblow ${moment().year()}`}
      </a>
    </NavItem>
  </Toolbar>
);

export default AppFooter;
