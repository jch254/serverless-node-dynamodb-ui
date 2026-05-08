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
      <a href="https://603.nz" style={{ cursor: 'pointer', color: 'black' }}>
        {`© 603.nz ${moment().year()}`}
      </a>
    </NavItem>
  </Toolbar>
);

export default AppFooter;
