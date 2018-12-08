#!/bin/bash

### Run front ci ###
npm ci
npm run lint:ci
npm run test:ci
npm run pact:publish
npm run build:ci

### Run api ci ###
cd api
npm ci
npm run start:ci & \
npm run proxy:pact & \
npm run pact:provider

### Run e2e ci ###
cd ../
npm run start:ci &
npm run e2e:ci

### Kill all processes ###
./kill-all.sh
