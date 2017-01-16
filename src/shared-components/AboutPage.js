import React from 'react';
import {
  Heading,
  Container,
} from 'rebass';
import { Flex } from 'reflexbox';

import styles from './AboutPage.css';

const AboutPage = () => (
  <Flex style={{ flex: '1 0 auto' }} >
    <Container style={{ width: '100%' }} pt={3} pb={3}>
      <Heading level={2} big>
        About
      </Heading>
      <Heading mt={2} level={2}>
        This UI is built with React/Redux and sits in front of an API powered by Serverless Framework (Node.js)
        and DynamoDB. I created these projects as a starting point for Serverless web apps.
      </Heading>
      <Heading mt={2} level={2}>
        The API is deployed to AWS with Serverless Framework. The UI is deployed to AWS on S3, CloudFront is used
        as a CDN and Route 53 is used for DNS - all infrastructure is defined as code with Terraform.
      </Heading>
      <Heading mt={2} level={2}>
        Manual steps suck so both projects use Bitbucket Pipelines to automate the build and deployment to AWS.
        I&#39;ve also created Docker-powered build/deployment environments for both Serverless and AWS-hosted
        React/Redux projects to use with Bitbucket Pipelines.
      </Heading>
      <Heading mt={2} level={2}>
        I strive to build self-contained projects - everything required to develop, build, run, test and deploy is
        defined as code and lives in one repository. This is highly beneficial as each project has a single source of
        truth.
      </Heading>
      <Heading mt={3} level={1}>
        GitHub Repositories
      </Heading>
      <Heading mt={1} ml={1} level={2}>
        <a
          href="https://github.com/jch254/serverless-es6-dynamodb-webapi"
          className={styles.hoverLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          serverless-es6-dynamodb-webapi
        </a>
      </Heading>
      <Heading level={2} ml={1}>
        <a
          href="https://github.com/jch254/react-redux-terraform-aws"
          className={styles.hoverLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          react-redux-terraform-aws
        </a>
      </Heading>
      <Heading level={2} ml={1}>
        <a
          href="https://github.com/jch254/docker-node-serverless"
          className={styles.hoverLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          docker-node-serverless
        </a>
      </Heading>
      <Heading level={2} ml={1}>
        <a
          href="https://github.com/jch254/docker-node-terraform-aws"
          className={styles.hoverLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          docker-node-terraform-aws
        </a>
      </Heading>
    </Container>
  </Flex>
);

export default AboutPage;
