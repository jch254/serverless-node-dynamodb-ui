# [Serverless-node-dynamodb-ui](https://serverless-api.603.nz)

React/Redux SPA fronting [Serverless API](https://github.com/jch254/serverless-node-dynamodb-api). Built as a static bundle, served from a private S3 origin behind CloudFront, with Cloudflare DNS. Auth0 handles authentication via Universal Login (redirect flow), and the SPA forwards the issued RS256 ID token to the API as `Authorization: Bearer <jwt>`.

## Runtime and stack

- Node.js 22 (`.nvmrc`, `package.json` engines, Dockerfile, CodeBuild image)
- pnpm 9.15.9 (`packageManager` in `package.json`)
- React 18, React Router 6
- Redux 5, React Redux 9, Redux Saga 1
- TypeScript 6, Webpack 5
- `@auth0/auth0-spa-js` (Universal Login, redirect flow, in-memory token cache)
- Static production output in [`dist`](./dist)

The original Rebass / Reflexbox / Geomicons usage is preserved through local compatibility shims so the layout stays stable on the modern toolchain.

## Auth model

Authentication goes through Auth0's hosted Universal Login. After redirect callback, the SPA reads `getIdTokenClaims().__raw` and sends it as `Authorization: Bearer <jwt>` on every API call. The Auth0 application must be:

- **Application Type**: Single Page Application
- **JWT Signature Algorithm**: RS256
- **Allowed Callback URLs / Logout URLs / Web Origins**: include `https://serverless-api.603.nz` (and `http://localhost:3001` for local dev)

[`src/auth/Auth0Wrapper.tsx`](./src/auth/Auth0Wrapper.tsx) provides the `Auth0Provider` + `useAuth0` hook; [`src/auth/PrivateRoute.tsx`](./src/auth/PrivateRoute.tsx) gates routes that require authentication.

---

**`AUTH0_CLIENT_ID`, `AUTH0_DOMAIN` and `API_BASE_URI` env vars must be set before any `pnpm run` command below. `GA_ID` is optional and enables analytics in production builds.**

E.g. `AUTH0_CLIENT_ID=YOUR_CLIENT_ID AUTH0_DOMAIN=your-tenant.auth0.com API_BASE_URI=https://sls-api.603.nz pnpm run dev`

### Running locally (with live-reloading)

```bash
pnpm install
pnpm run dev
```

Open <http://localhost:3001>.

### Running development version locally in Docker

```bash
docker build -t sls-ui .
docker run -p 3001:3001 \
  -e AUTH0_CLIENT_ID=YOUR_CLIENT_ID \
  -e AUTH0_DOMAIN=your-tenant.auth0.com \
  -e API_BASE_URI=https://sls-api.603.nz \
  sls-ui
```

Open <http://localhost:3001>.

### Building the production version

```bash
pnpm install
pnpm run build
```

The static bundle lands in `./dist`.

### Running production version locally

```bash
pnpm install
pnpm run prod
```

Open <http://localhost:3001>.

### Deployment/Infrastructure

CodeBuild installs with pnpm, runs the production webpack build, applies Terraform drift if any, syncs `dist/` to the private S3 origin, and invalidates CloudFront. DNS lives in Cloudflare, ACM cert in `us-east-1`, CloudFront uses an Origin Access Control to read from the bucket.

Refer to the [/infrastructure](./infrastructure) directory.
