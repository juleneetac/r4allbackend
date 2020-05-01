FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
#RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3600
CMD [ "npm", "start" ]
