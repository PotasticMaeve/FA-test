# Builder Stage
FROM node:alpine as builder
LABEL author="Claudia"

WORKDIR /app
RUN apk update
WORKDIR /app/FA-test
COPY . .
RUN npm i
RUN npm run build
CMD ["npm", "run", "start"]