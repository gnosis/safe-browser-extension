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
yarn build:staging
cd ./build && zip -r ../ci/outputs/gnosis-safe-authenticator-$TRAVIS_BUILD_NUMBER-staging-rinkeby.zip * && cd ..
rm -r ./build

# PRE-PRODUCTION: Build and zip Rinkeby version
yarn build:preprod
cd ./build && zip -r ../ci/outputs/gnosis-safe-authenticator-$TRAVIS_BUILD_NUMBER-preprod-rinkeby.zip * && cd ..
rm -r ./build

# PRE-PRODUCTION: Build and zip Mainnet version
yarn build:preprod-mainnet
cd ./build && zip -r ../ci/outputs/gnosis-safe-authenticator-$TRAVIS_BUILD_NUMBER-preprod-mainnet.zip * && cd ..
rm -r ./build

# PRODUCTION: Build and zip Rinkeby version
yarn build:prod
cd ./build && zip -r ../ci/outputs/gnosis-safe-authenticator-$TRAVIS_BUILD_NUMBER-rinkeby.zip * && cd ..
rm -r ./build

# PRODUCTION: Build and zip Mainnet version
yarn build:prod-mainnet
cd ./build && zip -r ../ci/outputs/gnosis-safe-authenticator-$TRAVIS_BUILD_NUMBER-mainnet.zip * && cd ..
rm -r ./build
