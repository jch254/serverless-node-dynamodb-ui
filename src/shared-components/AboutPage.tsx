import * as React from 'react';
import {
  Container,
  Heading,
  Text,
} from 'rebass';
import { Flex } from 'reflexbox';

const styles = require('./AboutPage.css');

const AboutPage: React.StatelessComponent<{}> = () => (
  <Flex style={{ flex: '1 0 auto' }} >
    <Container style={{ width: '100%' }} pt={3} pb={3}>
      <Heading level={3} big>
        About
      </Heading>
      <Text mt={2}>
        React/Redux-powered UI to front Serverless API. This project utilises TypeScript for type checking
        and transpliation to browser-friendly ES5 JavaScript. I created these projects as a starting point for Serverless web apps.
        <br />
        <br />
        Auth0 handles authentication. Users must signup/login to generate an auth token and gain access to the
        secured area. All endpoints in the API check validity of the auth token and return unauthorised
        if invalid or expired, the UI then prompts the user to log in again.
        The API also determines the identity of the user via the auth token.
        <br />
        <br />
        I aim to build self-contained projects - everything required to develop, build, run, test and deploy is
        defined as code and lives in one repository. This is highly beneficial as each project has a single source of
        truth.
      </Text>
      <Heading mt={3} level={3}>
        GitHub Repositories
      </Heading>
      <Text mt={1}>
        <a
          href="https://github.com/jch254/serverless-node-dynamodb-api"
          className={styles.hoverLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          - serverless-node-dynamodb-api
        </a>
      </Text>
      <Text>
        <a
          href="https://github.com/jch254/serverless-node-dynamodb-ui"
          className={styles.hoverLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          - serverless-node-dynamodb-ui
        </a>
      </Text>
      <Text>
        <a
          href="https://github.com/jch254/docker-node-serverless"
          className={styles.hoverLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          - docker-node-serverless
        </a>
      </Text>
      <Text>
        <a
          href="https://github.com/jch254/docker-node-terraform-aws"
          className={styles.hoverLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          - docker-node-terraform-aws
        </a>
      </Text>
    </Container>
  </Flex>
);

export default AboutPage;
