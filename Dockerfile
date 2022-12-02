# Builder Stage
FROM node:alpine as builder
LABEL author="Claudia"

WORKDIR /app
RUN apk update
WORKDIR /app/FA-test
COPY . .
RUN npm i
RUN npm run build


# Runtime Stage
FROM nginx:1.15-alpine
COPY --from=builder /app/FA-test/build /usr/share/nginx/html