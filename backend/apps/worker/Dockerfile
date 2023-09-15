FROM node:alpine as builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build:worker

FROM node:alpine as runner
WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./
RUN npm install --only=production

COPY . .
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/apps/worker/main"]
