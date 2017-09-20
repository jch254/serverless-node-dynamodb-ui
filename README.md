# [Serverless-node-dynamodb-ui (Live Demo)](https://serverless-api.603.nu)

[Bitbucket Pipelines status](https://bitbucket.org/jch254/serverless-node-dynamodb-ui/addon/pipelines/home)

React/Redux-powered UI to front [Serverless API](https://github.com/jch254/serverless-node-dynamodb-api). This project utilises [TypeScript for type checking](https://www.youtube.com/watch?v=V1po0BT7kac) and transpliation to browser-friendly ES5 JavaScript. Auth0 handles authentication. Users must sign up/login to generate an auth token and gain access to the secured area. All endpoints in the API check validity of the auth token and return unauthorised if invalid, the UI then prompts the user to log in again. The API also determines the identity of the user via the auth token.

### Main technologies used

* [React](https://facebook.github.io/react/)
* [Redux](https://github.com/reactjs/redux/)
* [Redux-saga](https://github.com/yelouafi/redux-saga/)
* [Auth0 Lock](https://github.com/auth0/lock)
* [React Router](https://github.com/ReactTraining/react-router)
* [Reselect](https://github.com/jxnblk/rebass)
* [Rebass](https://github.com/jxnblk/rebass) & [Reflexbox](https://github.com/jxnblk/reflexbox)
* [React Loadable](https://github.com/thejameskyle/react-loadable)
* [Webpack](https://github.com/webpack/webpack)
* [TypeScript](https://github.com/Microsoft/TypeScript)
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

### Running development version locally in Docker container
1. Run the following commands in the app's root directory then submit requests to http://localhost:3001.

```
docker build -t sls-api .
docker run -p 3001:3001 -e AUTH0_CLIENT_ID=YOUR_CLIENT_ID -e AUTH0_DOMAIN=YOUR_DOMAIN -e API_BASE_URI=YOUR_API sls-api
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
