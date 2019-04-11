#!/bin/bash
set -ev

rm -r ./ci/outputs

# STAGING: Build and zip Rinkeby version
rm -r ./build
npm run build:staging
zip -r ./ci/outputs/staging-rinkeby.zip ./build/*

# PRE-PRODUCTION: Build and zip Rinkeby version
rm -r ./build
npm run build:preprod
zip -r ./ci/outputs/preprod-rinkeby.zip ./build/*

# PRE-PRODUCTION: Build and zip Mainnet version
rm -r ./build
npm run build:preprod-mainnet
zip -r ./ci/outputs/preprod-mainnet.zip ./build/*

# PRODUCTION: Build and zip Rinkeby version
rm -r ./build
npm run build:prod
zip -r ./ci/outputs/prod-rinkeby.zip ./build/*

# PRODUCTION: Build and zip Mainnet version
rm -r ./build
npm run build:prod-mainnet
zip -r ./ci/outputs/prod-mainnet.zip ./build/*