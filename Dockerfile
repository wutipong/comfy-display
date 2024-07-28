FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

FROM node:22-alpine
WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json  /app/
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/build /app/build   

EXPOSE 3000
CMD ["node", "/app/build"]