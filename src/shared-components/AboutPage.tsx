import * as React from 'react';
import {
  Container,
  Heading,
  Subhead,
  Text,
} from 'rebass';

const styles = require('./AboutPage.css');

const AboutPage: React.StatelessComponent<{}> = () => (
  <Container w={1} style={{ flex: 'auto' }} py={3}>
    <Heading f={8}>
      About
    </Heading>
    <Text pt={3}>
      React/Redux-powered UI to front Serverless API. This project utilises TypeScript for type checking
      and transpliation to browser-friendly ES5 JavaScript. I created these projects as a starting point for Serverless web apps.
    </Text>
    <Text pt={2}>
      Auth0 handles authentication. Users must signup/login to generate an auth token and gain access to the
      secured area. All endpoints in the API check validity of the auth token and return unauthorised
      if invalid or expired, the UI then prompts the user to log in again.
      The API also determines the identity of the user via the auth token.
    </Text>
    <Text pt={2}>
      I aim to build self-contained projects - everything required to develop, build, run, test and deploy is
      defined as code and lives in one repository. This is highly beneficial as each project has a single source of
      truth.
    </Text>
    <Subhead pt={36}>
      GitHub Repositories
    </Subhead>
    <Text pt={1}>
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
);

export default AboutPage;
