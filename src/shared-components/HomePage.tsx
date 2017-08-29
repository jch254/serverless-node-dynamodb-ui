import * as React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Heading,
  Text,
} from 'rebass';
import { bindActionCreators, Dispatch } from 'redux';
import { Flex } from 'reflexbox';

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

const HomePage: React.StatelessComponent<{} & StateProps & DispatchProps> = ({ isLoggedIn, actions }) => (
  <Flex style={{ flex: '1 0 auto' }} >
    <Container style={{ width: '100%' }} pt={3} pb={3}>
      <Heading level={3} big>
        <a
          href="http://docs.serverlessapi.apiary.io"
          className={styles.hoverLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Serverless API
        </a>
      </Heading>
      <Text mt={2}>
        A simple API powered by Serverless, TypeScript, Webpack and DynamoDB, intended as a starting point for Serverless APIs.
        <br />
        <br />
        Auth0 handles authentication - login below or in the navbar to generate an auth token and gain
        access to the secured area.
      </Text>
      {
        isLoggedIn ?
          <div onClick={actions.logout}>
            <Button theme="error" mt={3} big>
              Logout
            </Button>
          </div> :
          <div onClick={actions.loginRequest}>
            <Button theme="success" mt={3} big>
              Login
            </Button>
          </div>
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

