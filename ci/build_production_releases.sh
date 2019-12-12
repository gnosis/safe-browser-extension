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

# PRODUCTION: Build and zip Rinkeby version
yarn build:prod
cd ./build && zip -r ../ci/outputs/gnosis-safe-authenticator-$TRAVIS_BUILD_NUMBER-rinkeby.zip * && cd ..
rm -r ./build

# PRODUCTION: Build and zip Mainnet version
yarn build:prod-mainnet
cd ./build && zip -r ../ci/outputs/gnosis-safe-authenticator-$TRAVIS_BUILD_NUMBER-mainnet.zip * && cd ..
rm -r ./build
