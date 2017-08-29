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
        A simple React/Redux-powered UI to front a simple Serverless API. This project utilises TypeScript for type checking
        and transpliation to browser-friendly ES5 JavaScript. I created these projects as a starting point for Serverless web apps.
        <br />
        <br />
        Auth0 handles authentication. Users must signup/login to generate an auth token and gain access to the
        secured area. All endpoints in the API check validity of the auth token and return unauthorised
        if invalid or expired, the UI then prompts the user to log in again.
        The API also determines the identity of the user via the auth token.
        <br />
        <br />
        Manual steps suck so both projects use Bitbucket Pipelines to automate the build and deployment to AWS.
        I&#39;ve also created Docker-powered build/deployment environments for both Serverless and AWS-hosted
        React/Redux projects to use with Bitbucket Pipelines.
        <br />
        <br />
        I strive to build self-contained projects - everything required to develop, build, run, test and deploy is
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
