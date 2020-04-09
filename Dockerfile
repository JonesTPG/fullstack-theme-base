FROM node:10

WORKDIR /app

COPY . .

RUN cd front-end && npm install && npm run build:ui && cd ..

RUN cd back-end && npm install

EXPOSE 4000

CMD [ "npm", "run", "start:docker" ]