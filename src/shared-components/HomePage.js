import React from 'react';
import {
  Heading,
  Container,
} from 'rebass';
import { Flex } from 'reflexbox';

import ItemCreator from '../items/ItemCreator';

const HomePage = () => (
  <Flex style={{ flex: '1 0 auto' }} >
    <Container style={{ width: '100%' }} pt={3} pb={3}>
      <Heading level={1} big>
        Serverless Web API
      </Heading>
      <Heading mt={1} level={4} big>
        A simple web API powered by Serverless (Node.js), Webpack and DynamoDB, intended as a starting point for
        Serverless web APIs.
      </Heading>
      <ItemCreator />
    </Container>
  </Flex>
);

export default HomePage;
