FROM node:latest

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4444

CMD ["npm", "start"]