#!/bin/bash

rm -r ./ci/outputs

# PRODUCTION: Build and zip Rinkeby version
rm -r ./build
npm run build:prod
zip -r ./ci/outputs/prod-rinkeby.zip ./build/*

# PRODUCTION: Build and zip Mainnet version
rm -r ./build
npm run build:prod-mainnet
zip -r ./ci/outputs/prod-mainnet.zip ./build/*
