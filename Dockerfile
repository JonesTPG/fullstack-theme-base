FROM node:10

WORKDIR /usr/src/app

COPY back-end/package*.json ./

RUN npm install

COPY back-end .

EXPOSE 4000

CMD [ "node", "index.js" ]