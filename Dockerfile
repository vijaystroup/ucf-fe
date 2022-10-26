FROM node:16.16.0-alpine

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD npm run start
