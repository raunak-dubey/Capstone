FROM node:22-alpine

WORKDIR /workspace

RUN apk add --no-cache curl
RUN corepack enable \
    && corepack prepare pnpm@latest --activate

EXPOSE 5173

HEALTHCHECK --interval=30s \
    --timeout=5s \
    --start-period=20s \
    --retries=3 \
    CMD curl -f http://localhost:5173 || exit 1

CMD ["sh", "-c", "pnpm install --frozen-lockfile=false && pnpm run dev -- --host 0.0.0.0"]