# [Serverless-node-dynamodb-ui (Live Demo)](https://serverless-api.603.nu)

[Bitbucket Pipelines status](https://bitbucket.org/jch254/serverless-node-dynamodb-ui/addon/pipelines/home)

A simple React/Redux-powered UI to front a simple [Serverless API](https://github.com/jch254/serverless-node-dynamodb-api). This project is written with a functional mindset with help from Immutable.js and Reselect for efficient client-side data manipulation.

Auth0 handles authentication. You must signup/login to generate an auth token and gain access to the secured area. All endpoints in the API check validity of the auth token and return unauthorised if invalid, the UI then prompts you to log in again. The API also determines the identity of the user via the auth token.

This project is deployed to AWS on S3, CloudFront is used as a CDN and Route 53 is used for DNS. All infrastructure is defined as code in the [/infrastructure](infrastructure) directory. Manual steps suck so this project uses Bitbucket Pipelines to automate the build and deployment to AWS - see [bitbucket-pipelines.yml](bitbucket-pipelines.yml). AWS credentials are set using [Bitbucket Pipelines environment variables](https://confluence.atlassian.com/bitbucket/environment-variables-in-bitbucket-pipelines-794502608.html).

### Main technologies used

* [React](https://facebook.github.io/react/)
* [Redux](https://github.com/reactjs/redux/)
* [Redux-saga](https://github.com/yelouafi/redux-saga/)
* [Auth0 Lock](https://github.com/auth0/lock)
* [Immutable.js](https://github.com/facebook/immutable-js/)
* [React Router](https://github.com/ReactTraining/react-router)
* [Reselect](https://github.com/jxnblk/rebass)
* [Webpack](https://github.com/webpack/webpack)
* [Node.js](https://github.com/nodejs/node)

--

**AUTH0_CLIENT_ID, AUTH0_DOMAIN and API_BASE_URI environment variable must be set before `yarn run` commands below.**

E.g. `AUTH0_CLIENT_ID=YOUR_CLIENT_ID AUTH0_DOMAIN=YOUR_DOMAIN API_BASE_URI="https://serverless-web-api.amazon.com" yarn run dev`

### Running locally (with live re-loading)

1. Run the following commands in the app's root directory then open http://localhost:3001

```
yarn install
yarn run dev
```

### Building the production version
1. Run the following commands in the app's root directory then check the /dist folder

```
yarn install
yarn run build
```

### Running production version locally

1. Run the following commands in the app's root directory then open http://localhost:3001

```
yarn install
yarn run prod
```

### Deployment/Infrastructure

Refer to the [/infrastructure](infrastructure) directory.
