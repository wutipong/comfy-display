FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/build /app/build

EXPOSE 3000
CMD ["node", "/app/build"]