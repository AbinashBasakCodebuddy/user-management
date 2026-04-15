FROM node:20-alpine AS base-image

WORKDIR /build

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm 

RUN pnpm install --prod && pnpm cache clean

COPY . .

EXPOSE 7777
CMD ["node", "dist/index.js"]