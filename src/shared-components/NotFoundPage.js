import React from 'react';
import { Flex } from 'reflexbox';
import {
  Heading,
  Container,
} from 'rebass';

const NotFoundPage = () => (
  <Flex style={{ flex: '1 0 auto' }} >
    <Container style={{ width: '100%' }} pt={3} pb={3}>
      <Heading mt={1} size={1} big>
        404!
      </Heading>
      <Heading mt={1} level={4} big>
        Sorry mate, that page does not exist.
      </Heading>
    </Container>
  </Flex>
);

export default NotFoundPage;
