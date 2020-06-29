FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
#RUN npm ci --only=production

COPY . .
COPY ./ser.pem ../
COPY ./ser.key ../
RUN npm run tsc


EXPOSE 7000
CMD [ "npm", "run", "prod" ]
