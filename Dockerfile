# Build the code
FROM node:lts-alpine AS builder

WORKDIR "/app"
COPY package.json .
RUN npm install --production
COPY . .
CMD ["npm", "run", "start:prod"]
