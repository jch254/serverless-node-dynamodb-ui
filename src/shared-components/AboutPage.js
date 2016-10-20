import React from 'react';
import {
  Heading,
  Container,
} from 'rebass';
import { Flex } from 'reflexbox';

// TODO: Explain Web API
// TODO: Explain UI
// TODO: Explain build/deployment
// TODO: GitHub links
const AboutPage = () => (
  <Flex style={{ flex: '1 0 auto' }} >
    <Container style={{ width: '100%' }} pt={3} pb={3}>
      <Heading mt={1} level={2} big>
        About
      </Heading>
      <Heading mt={1} level={2}>
        Coming soon g.
      </Heading>
    </Container>
  </Flex>
);

export default AboutPage;
