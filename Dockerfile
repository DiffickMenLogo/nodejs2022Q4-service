FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install && npm cache clean --force

COPY . .

CMD ["npm", "run", "start"]

EXPOSE ${PORT}
