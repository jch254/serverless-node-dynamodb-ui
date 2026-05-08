import * as React from 'react';
import {
  Button,
  Container,
  Heading,
  Text,
} from 'rebass';
import { Flex } from 'reflexbox';

import { useAuth0 } from '../auth/Auth0Wrapper';

const styles = require('./HomePage.css');

const HomePage: React.FC = () => {
  const { user, loginWithRedirect, logout } = useAuth0();
  const isLoggedIn = user !== undefined;

  return (
    <Flex style={{ flex: '1 0 auto' }}>
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
          An API powered by Serverless, TypeScript, Webpack and DynamoDB, intended as a starting point for Serverless APIs.
          <br />
          <br />
          Auth0 handles authentication - login below or in the navbar to generate an auth token and gain
          access to the secured area.
        </Text>
        {
          isLoggedIn ?
            <div onClick={() => logout({ returnTo: window.location.origin, client_id: process.env.AUTH0_CLIENT_ID })}>
              <Button theme="error" mt={3} big>
                Logout
              </Button>
            </div> :
            <div onClick={() => loginWithRedirect({ appState: { targetUrl: '/items' } })}>
              <Button theme="success" mt={3} big>
                Login
              </Button>
            </div>
        }
      </Container>
    </Flex>
  );
};

export default HomePage;
