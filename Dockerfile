# Build stage
FROM node:18-alpine as builder

WORKDIR /app

COPY lambda/package*.json ./
RUN npm ci --only=production

# Runtime stage
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY --from=builder /app/node_modules ./node_modules
COPY lambda/index.js ./index.js

EXPOSE 8080

CMD ["node", "index.js"]
