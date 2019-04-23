#!/bin/bash
set -v

if [ ! -e ".env" ]; then
    touch .env
fi 
if [ -d "./ci/outputs" ]; then
  rm -r ./ci/outputs
fi
mkdir ./ci/outputs
if [ -d "./build" ]; then
  rm -r ./build
fi

# STAGING: Build and zip Rinkeby version
npm run build:staging
zip -r ./ci/outputs/safe-browser-extension-$TRAVIS_BUILD_NUMBER-staging-rinkeby.zip ./build/*

rm -r ./build

# PRE-PRODUCTION: Build and zip Rinkeby version
npm run build:preprod
zip -r ./ci/outputs/safe-browser-extension-$TRAVIS_BUILD_NUMBER-preprod-rinkeby.zip ./build/*

rm -r ./build

# PRE-PRODUCTION: Build and zip Mainnet version
npm run build:preprod-mainnet
zip -r ./ci/outputs/safe-browser-extension-$TRAVIS_BUILD_NUMBER-preprod-mainnet.zip ./build/*

rm -r ./build

# PRODUCTION: Build and zip Rinkeby version
npm run build:prod
zip -r ./ci/outputs/safe-browser-extension-$TRAVIS_BUILD_NUMBER-rinkeby.zip ./build/*

rm -r ./build

# PRODUCTION: Build and zip Mainnet version
npm run build:prod-mainnet
zip -r ./ci/outputs/safe-browser-extension-$TRAVIS_BUILD_NUMBER-mainnet.zip ./build/*
