FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8888

VOLUME [ "/app/node_modules" ]

CMD ["npm", "run", "start"]