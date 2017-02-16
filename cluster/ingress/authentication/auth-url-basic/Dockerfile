FROM node:7.5.0

ADD . /app
WORKDIR /app
RUN npm install

EXPOSE 8080
ENTRYPOINT ["/usr/local/bin/node", "index.js"]
