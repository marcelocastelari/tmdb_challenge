FROM node:19

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install sequelize-cli --save

COPY . .

RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]
