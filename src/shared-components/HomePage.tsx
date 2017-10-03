import * as React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Flex,
  Heading,
  Subhead,
  Text,
} from 'rebass';
import { bindActionCreators, Dispatch } from 'redux';

import { loginRequest, logout } from '../auth/reducer';
import { getIsLoggedIn } from '../auth/selectors';
import { GlobalState } from '../rootReducer';

interface StateProps {
  isLoggedIn: boolean;
}

interface DispatchProps {
  actions: {
    loginRequest: typeof loginRequest,
    logout: typeof logout,
  };
}

const styles = require('./HomePage.css');

// TODO: Improve button spacing
// TODO: Link to about page
const HomePage: React.StatelessComponent<{} & StateProps & DispatchProps> = ({ isLoggedIn, actions }) => (
  <Flex width={1} align="center" justify="center" column style={{ flex: 'auto' }}>
    <Container>
      <Heading f={8}>
        <a
          href="http://docs.serverlessapi.apiary.io"
          className={styles.hoverLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Serverless API
        </a>
      </Heading>
      <Subhead pt={2}>
        Powered by Serverless, TypeScript, Webpack and DynamoDB
      </Subhead>
      <Text pt={2}>
      Login to generate an auth token and gain access to the secured area.
      </Text>
      {
        isLoggedIn ?
          <Button bg="red4" onClick={actions.logout} style={{ cursor: 'pointer' }}>
            Logout
          </Button> :
          <Button bg="green4" onClick={actions.loginRequest} style={{ cursor: 'pointer' }}>
            Login
          </Button>
      }
    </Container>
  </Flex>
);

const mapStateToProps = (state: GlobalState, ownProps: {}): StateProps => ({
  isLoggedIn: getIsLoggedIn(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  actions: bindActionCreators({ loginRequest, logout }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

