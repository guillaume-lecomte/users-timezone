FROM node:slim

WORKDIR /app

COPY package*.json ./

RUN apt-get update
RUN npm cache clean --force \
 && npm install

COPY . .

ENV PORT 3001

EXPOSE 3001

CMD ["npm", "start"]