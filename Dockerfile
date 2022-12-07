FROM node:18-alpine3.15

RUN npm install -g --unsafe-perm pm2 typescript

WORKDIR /node/backend_app

COPY package*.json ./

RUN npm install
RUN apk update && apk add bash

COPY /src ./src
COPY tsconfig.json ./

ENV NODE_ENV=${NODE_ENV}
ENV HOST=${HOST}
ENV PORT=${PORT}
ENV MONGODB_URI=${MONGODB_URI}
ENV REDIS_HOST=${REDIS_HOST}
ENV REDIS_PORT=${REDIS_PORT}
ENV TOKEN_ISSUER=${TOKEN_ISSUER}
ENV SECRET=${SECRET}
ENV SYMMETRIC_ALGO=${SYMMETRIC_ALGO}
ENV TZ=${TZ}
ENV LOGS_DIR=${LOGS_DIR}
ENV ERROR_LOG_FILENAME=${ERROR_LOG_FILENAME}

RUN npm run test
RUN rm -r ./src
RUN rm tsconfig.json

CMD ["pm2-runtime", "dist/index.js"]