FROM node:22-alpine

WORKDIR /workspace

RUN corepack enable
RUN corepack prepare pnpm@latest --activate

EXPOSE 5173

CMD ["sh", "-c", "pnpm install && pnpm run dev -- --host 0.0.0.0"]