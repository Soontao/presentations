FROM node:lts-slim

LABEL MAINTAINER https://github.com/Soontao/RSSHub

ENV NODE_ENV production
ENV TZ Asia/Shanghai
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN ln -sf /bin/bash /bin/sh

RUN apt-get update && apt-get install -yq libgconf-2-4 apt-transport-https git ca-certificates --no-install-recommends

WORKDIR /app

RUN git clone --depth 1 https://github.com/Soontao/RSSHub /app

RUN npm install --production;

EXPOSE 1200

CMD ["npm", "run", "start"]