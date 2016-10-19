# React-redux-terraform-aws

A simple React/Redux-powered UI to front a simple Serverless web API. Written with a functional mindset - this project uses Immutable.js and Reselect for efficient client-side data manipulation.

### Main technologies used

* [React](https://facebook.github.io/react/)
* [Redux](https://github.com/reactjs/redux/)
* [Redux-saga](https://github.com/yelouafi/redux-saga/)
* [Immutable.js](https://github.com/facebook/immutable-js/)
* [Reselect](https://github.com/jxnblk/rebass)
* [Webpack](https://github.com/webpack/webpack)
* [Node.js](https://github.com/nodejs/node)

--

**API_BASE_URI environment variable must be set before `npm run` commands below.**

E.g. `API_BASE_URI="https://serverless-web-api.amazon.com" npm run dev`

### Running locally (with live re-loading)

1. Run the following commands in the app's root directory then open http://localhost:3001

```
npm install
npm run dev
```

### Building the production version
1. Run the following commands in the app's root directory then check the /dist folder

```
npm install
npm run build
```

### Deployment/Infrastructure

Refer to the [/infrastructure]() directory.
