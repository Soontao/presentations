# docker build -t cap-training-session-5-example-express .
# docker run -d --rm -p3000:3000 -p9229:9229 -eNODE_OPTIONS=--inspect=0.0.0.0:9229 cap-training-session-5-example-express
FROM node:lts

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .
ENV PORT 3000
EXPOSE 3000

CMD [ "node", "server.js" ]
