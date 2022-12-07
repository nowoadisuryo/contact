FROM node:18-alpine3.15

RUN npm install -g --unsafe-perm pm2 typescript

WORKDIR /node/backend_app

COPY package*.json ./

RUN npm install
RUN apk update && apk add bash

COPY /src ./src
COPY tsconfig.json ./

RUN npm run build
RUN rm -r ./src
RUN rm tsconfig.json

CMD ["pm2-runtime", "dist/index.js"]