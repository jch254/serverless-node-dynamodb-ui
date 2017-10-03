import * as React from 'react';
import {
  Container,
  Flex,
  Heading,
  Subhead,
} from 'rebass';

const NotFoundPage = () => (
  <Flex width={1} align="center" justify="center" column style={{ flex: 'auto' }}>
    <Container>
      <Heading f={8}>
        404.
      </Heading>
      <Subhead mt={2}>
        Sorry, that page does not exist.
      </Subhead>
    </Container>
  </Flex>
);

export default NotFoundPage;
