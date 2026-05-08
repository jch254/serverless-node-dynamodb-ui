FROM node:22-alpine
WORKDIR /app

COPY package.json pnpm-lock.yaml .npmrc ./
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate && pnpm install --frozen-lockfile

ENV SERVER_HOSTNAME=0.0.0.0

COPY server.ts tsconfig.json tsconfig-webpack.json tslint.json webpack.config.ts webpack.prod.config.ts ./
COPY src src

EXPOSE 3001/tcp

ENTRYPOINT ["pnpm", "run", "dev"]
