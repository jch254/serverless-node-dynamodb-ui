import React from 'react';
import {
  Heading,
  Container,
} from 'rebass';
import { Flex } from 'reflexbox';

import ItemCreator from '../items/ItemCreator';

import styles from './HomePage.css';

const HomePage = () => (
  <Flex style={{ flex: '1 0 auto' }} >
    <Container style={{ width: '100%' }} pt={3} pb={3}>
      <Heading level={2} big>
        <a
          href="http://docs.serverlesses6dynamodbwebapi.apiary.io/"
          className={styles.hoverLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Serverless Web API
        </a>
      </Heading>
      <Heading mt={2} level={2}>
        A simple web API powered by Serverless Framework (Node.js), Webpack and DynamoDB, intended as a
        starting point for Serverless web APIs.
      </Heading>
      <ItemCreator />
    </Container>
  </Flex>
);

export default HomePage;
