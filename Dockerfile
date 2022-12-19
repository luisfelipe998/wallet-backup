FROM mhart/alpine-node:16.4
WORKDIR /
COPY ./package.json ./
RUN npm install
COPY ./src ./src
CMD ["npm", "start"]