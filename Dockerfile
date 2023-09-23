# build-stage

FROM node:18.0-alpine3.14 as build-stage

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# production stage

FROM node:18.0-alpine3.14 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm install --production

RUN npm i pm2 -g

EXPOSE 3000

# TODO: 后续应改为守护进程运行
CMD ["pm2-runtime", "/app/main.js"]
