import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Heading,
  Container,
  Button,
} from 'rebass';
import { Flex } from 'reflexbox';

import { actions as authActions, selectors as authSelectors } from '../auth';

import styles from './HomePage.css';

const HomePage = ({ isLoggedIn, actions }) => (
  <Flex style={{ flex: '1 0 auto' }} >
    <Container style={{ width: '100%' }} pt={3} pb={3}>
      <Heading level={2} big>
        <a
          href="http://docs.serverlessapi.apiary.io"
          className={styles.hoverLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Serverless API
        </a>
      </Heading>
      <Heading mt={2} level={3}>
        A simple API powered by Serverless, Node.js and DynamoDB, intended as a
        starting point for Serverless APIs.
        <br />
        <br />
        Auth0 handles authentication - login below to generate an auth token and gain
        access to the secured area.
      </Heading>
      {
        isLoggedIn ?
          <Button theme="error" mt={3} big onClick={() => actions.logout()}>
            <Heading level={3}>
              Logout
            </Heading>
          </Button> :
          <Button theme="success" mt={3} big onClick={() => actions.login()}>
            <Heading level={3}>
              Login
            </Heading>
          </Button>
      }
    </Container>
  </Flex>
);

HomePage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    isLoggedIn: authSelectors.getIsLoggedIn(state),
  }
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators({ ...authActions }, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
