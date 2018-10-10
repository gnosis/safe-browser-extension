const ProviderEngine = require('web3-provider-engine')
const DefaultFixture = require('web3-provider-engine/subproviders/default-fixture.js')
const SubscriptionSubprovider = require('web3-provider-engine/subproviders/subscriptions.js')
const NonceTrackerSubprovider = require('web3-provider-engine/subproviders/nonce-tracker.js')
const CacheSubprovider = require('web3-provider-engine/subproviders/cache.js')
const InflightCacheSubprovider = require('web3-provider-engine/subproviders/inflight-cache')
const SanitizingSubprovider = require('web3-provider-engine/subproviders/sanitizer.js')
const FetchSubprovider = require('web3-provider-engine/subproviders/fetch.js')
const Web3 = require('web3')

const GnosisProvider = require('../app/utils/GnosisProvider')
const {
  getNetworkUrl,
  getNetworkVersion
} = require('../config')
const {
  EV_SCRIPT_READY,
  EV_UPDATE_WEB3
} = require('./utils/messages')

// window.addEventListener('load', function () {
//  console.log("Web page loaded")
// })

if (typeof window.web3 !== 'undefined') {
  // throw new Error('web3 already exists.')
  console.error('Gnosis Safe overrode an existing web3, please disable the whitelisting or uninstall one to prevent this.')
}

var engine = new ProviderEngine()
// isMetamask is something temporary. Must be deleted.
engine.isMetaMask = !0
engine.isSafe = true
engine.isConnected = function () {
  return true
}
const gnosisProvider = new GnosisProvider()
engine.addProvider(gnosisProvider)

// static
const staticSubprovider = new DefaultFixture()
engine.addProvider(staticSubprovider)

// nonce tracker
engine.addProvider(new NonceTrackerSubprovider())

// sanitization
const sanitizer = new SanitizingSubprovider()
engine.addProvider(sanitizer)

// cache layer
const cacheSubprovider = new CacheSubprovider()
engine.addProvider(cacheSubprovider)

const filterAndSubsSubprovider = new SubscriptionSubprovider()
// forward subscription events through provider
filterAndSubsSubprovider.on('data', (err, notification) => {
  engine.emit('data', err, notification)
})
engine.addProvider(filterAndSubsSubprovider)

// inflight cache
const inflightCache = new InflightCacheSubprovider()
engine.addProvider(inflightCache)

engine.addProvider(new FetchSubprovider({ rpcUrl: getNetworkUrl() }))

engine.send = function (payload) {
  // eslint-disable-next-line
  var r = undefined
  switch (payload.method) {
    case 'net_version':
      r = getNetworkVersion().toString()
      break

    default:
      throw new Error('Web3ProviderEngine does not support synchronous requests.')
  }

  return {
    id: payload.id,
    jsonrpc: payload.jsonrpc,
    result: r
  }
}

engine.start()

var web3 = new Web3(engine)
global.web3 = web3

document.addEventListener(EV_UPDATE_WEB3, function (data) {
  gnosisProvider.updateCurrentSafe(data.detail)
})

const scriptReadyEvent = new window.CustomEvent(EV_SCRIPT_READY)
document.dispatchEvent(scriptReadyEvent)
