FROM node:26 AS base
WORKDIR /home/node/app
COPY package*.json ./

FROM base AS development
RUN npm install
COPY . .
CMD [ "npm", "run", "dev" ]

FROM node:26-alpine AS production
WORKDIR /home/node/app
COPY package*.json ./
COPY . .
USER node
CMD [ "npm", "start" ]
