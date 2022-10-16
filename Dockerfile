FROM node:14-alpine

WORKDIR /notification-service

COPY package*.json  /notification-service/

RUN  npm install

EXPOSE 3000

COPY . .

RUN npm build

CMD ["npm", "start"]