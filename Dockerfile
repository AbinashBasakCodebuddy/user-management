FROM node:20-alpine AS base-image

WORKDIR /build

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm 

RUN pnpm install && pnpm cache clean

COPY . .
RUN pnpm run build

EXPOSE 7777
CMD ["node", "dist/index.js"]