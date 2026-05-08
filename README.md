# [Serverless-node-dynamodb-ui](https://serverless-api.603.nz)

React/Redux-powered UI to front [Serverless API](https://github.com/jch254/serverless-node-dynamodb-api). This project uses TypeScript and Webpack to build a static browser app. Auth0 handles authentication. Users must sign up/login to generate an auth token and gain access to the secured area. All endpoints in the API check validity of the auth token and return unauthorised if invalid, the UI then prompts the user to log in again. The API also determines the identity of the user via the auth token.

### Runtime and package management

- Node.js 22 (`.nvmrc`, `package.json` engines, Dockerfile, and CodeBuild image)
- pnpm 9.15.9 (`packageManager` in `package.json`)
- React 18 and React DOM 18
- React Router 6
- Redux 5, React Redux 9 and Redux Saga 1
- TypeScript 6 and Webpack 5
- Auth0 Lock 14
- Static production output in [`dist`](./dist)

The original Rebass, Reflexbox and Geomicons usage is preserved through local compatibility modules so the app behaviour and layout stay stable while the runtime stack is current.

--

**AUTH0_CLIENT_ID, AUTH0_DOMAIN and API_BASE_URI environment variables must be set before `pnpm run` commands below. GA_ID is optional and enables analytics in production builds.**

E.g. `AUTH0_CLIENT_ID=YOUR_CLIENT_ID AUTH0_DOMAIN=YOUR_DOMAIN API_BASE_URI="https://serverless-web-api.amazon.com" pnpm run dev`

### Running locally (with live re-loading)

1. Run the following commands in the app's root directory then open http://localhost:3001

```
pnpm install
pnpm run dev
```

### Running development version locally in Docker container
1. Run the following commands in the app's root directory then submit requests to http://localhost:3001.

```
docker build -t sls-api .
docker run -p 3001:3001 -e AUTH0_CLIENT_ID=YOUR_CLIENT_ID -e AUTH0_DOMAIN=YOUR_DOMAIN -e API_BASE_URI=YOUR_API sls-api
```

### Building the production version
1. Run the following commands in the app's root directory then check the `dist` folder

```
pnpm install
pnpm run build
```

### Running production version locally

1. Run the following commands in the app's root directory then open http://localhost:3001

```
pnpm install
pnpm run prod
```

### Deployment/Infrastructure

The app builds to static files and is deployed to S3/CloudFront with DNS managed by the Terraform in [`infrastructure/terraform`](./infrastructure/terraform). CodeBuild installs with pnpm, runs the production build, uploads `dist`, and invalidates CloudFront.

Refer to the [/infrastructure](./infrastructure) directory.
