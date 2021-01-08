FROM node:erbium

# set work dir for react-scripts
WORKDIR /usr/src/app

# cache node_modules
COPY .npmrc .yarnrc ./
COPY package.json package-*.json ./
COPY package.json yarn*.lock ./
RUN yarn install
