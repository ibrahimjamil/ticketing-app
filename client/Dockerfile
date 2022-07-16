FROM node:16-alpine

WORKDIR /app
COPY package.json .
RUN npm install
ENV NODE_ENV=development
COPY . .

CMD ["npm", "run", "dev"]