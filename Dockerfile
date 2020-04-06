# Build the code
FROM node:lts-alpine AS builder
RUN npm i -g @nestjs/cli

WORKDIR "/app"
COPY package.json .
RUN npm install --production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start:prod"]
