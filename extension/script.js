import { encode } from 'punycode';

const ProviderEngine = require('web3-provider-engine')
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js')
const Web3 = require('web3')

const GnosisProvider = require('../app/utils/GnosisProvider')
const config = require('../config.js')

//window.addEventListener('load', function () {
//  console.log("Web page loaded")
//})

var engine = new ProviderEngine()

engine.addProvider(new GnosisProvider())
engine.addProvider(new RpcSubprovider({
  rpcUrl: config.networks[config.currentNetwork].url,
}))

engine.start()

if (typeof window.web3 !== 'undefined') {
  throw new Error('web3 already exists.')
}

var web3 = new Web3(engine)
global.web3 = web3