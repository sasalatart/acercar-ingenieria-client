FROM node:8-alpine

LABEL maintainer="Sebastian Salata R-T <SA.SalataRT@GMail.com>"

ARG API_URL
ARG CLIENT_URL
ENV REACT_APP_API_URL $API_URL
ENV REACT_APP_CLIENT_URL $CLIENT_URL
ENV NODE_ENV=production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install

COPY . /usr/src/app
RUN yarn build

RUN yarn global add serve
CMD serve -s build

EXPOSE 5000
