FROM node:22-alpine

WORKDIR /workspace

RUN corepack enable

COPY apps/sandbox/templates .

RUN pnpm i

EXPOSE 5173

CMD ["pnpm", "run", "dev"]