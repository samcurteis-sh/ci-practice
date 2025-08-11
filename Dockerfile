FROM node:22-alpine AS base


# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app


# Install dependencies based on the preferred package manager
RUN echo "Contents of working directory:" && ls -al
RUN echo "Contents of node_modules:" && ls -al ./node_modules || echo "node_modules missing!"
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi \
  && echo "After install:" \
  && ls -al /app \
  && ls -al /app/node_modules || echo "node_modules not created"


# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

RUN echo "builder stage working dir:" && pwd && echo "Before COPY from deps:" && ls -al
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# This will do the trick, use the corresponding env file for each environment.
ARG NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; then cp .env.local .env; fi

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Public assets
COPY --from=builder /public ./public

# Entire standalone bundle (server.js, node_modules, package.json)
COPY --from=builder --chown=nextjs:nodejs /.next/standalone ./ 

# Copy static assets into the location server.js expects
COPY --from=builder --chown=nextjs:nodejs /.next/static ./.next/static



USER nextjs

EXPOSE 3000

ENV PORT=3000

# Use JSON array format for CMD to handle OS signals properly
CMD ["node", "server.js"]
