import ProviderEngine from 'web3-provider-engine'
import SubscriptionSubprovider from 'web3-provider-engine/subproviders/subscriptions.js'

import DefaultFixture from 'web3-provider-engine/subproviders/default-fixture.js'
import NonceTrackerSubprovider from 'web3-provider-engine/subproviders/nonce-tracker.js'
import CacheSubprovider from 'web3-provider-engine/subproviders/cache.js'
import InflightCacheSubprovider from 'web3-provider-engine/subproviders/inflight-cache'
import SanitizingSubprovider from 'web3-provider-engine/subproviders/sanitizer.js'
import FetchSubprovider from 'web3-provider-engine/subproviders/fetch.js'

import SafeSubprovider from './SafeSubprovider'
import { getNetworkVersion } from '../../config'
import { EV_UPDATE_PROVIDER } from './messages'

const SafeProvider = ({
  rpcUrl
}) => {
  var engine = new ProviderEngine()

  engine.setMaxListeners(0)

  // Metamask methods are temporary. Must be deleted in the future.
  engine.isMetaMask = !0
  engine._metamask = {
    isApproved: () => true,
    isUnlocked: () => true
  }

  engine.isSafe = true
  engine.isConnected = () => {
    return true
  }

  engine.addProvider(new SafeSubprovider())

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

  engine.addProvider(new FetchSubprovider({ rpcUrl }))

  const sendAsync = (payload, cb) => {
    engine.sendAsync(payload, cb)
  }

  const sendSync = (payload) => {
    // eslint-disable-next-line
    var r = undefined

    switch (payload.method) {
      case 'net_version':
        r = getNetworkVersion().toString()
        break

      case 'eth_accounts':
        r = engine.currentSafe ? [engine.currentSafe] : []
        break

      case 'eth_coinbase':
        r = engine.currentSafe || null
        break

      case 'eth_uninstallFilter':
        sendAsync(payload, () => { })
        r = true
        break

      default:
        throw new Error('SafeProvider does not support this synchronous request', payload)
    }
    return {
      id: payload.id,
      jsonrpc: payload.jsonrpc,
      result: r
    }
  }

  engine.send = (payload, callback) => {
    if (callback) {
      sendAsync(payload, callback)
    } else {
      return sendSync(payload)
    }
  }

  window.addEventListener(EV_UPDATE_PROVIDER, (data) => {
    engine.currentSafe = data.detail
  })

  engine.start()

  return engine
}

export default SafeProvider
