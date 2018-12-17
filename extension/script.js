import Web3 from 'web3'

import SafeProvider from './utils/SafeProvider'
import messages from './utils/messages'
import { getNetworkUrl } from '../config'

if (typeof window.web3 !== 'undefined') {
  throw new Error('Gnosis Safe detected another web3. Use the SafeProvider directly or unistall the other providers.')
}

const safeProvider = new SafeProvider({
  rpcUrl: getNetworkUrl()
})

const ethereumProvider = safeProvider
window.web3 = new Web3(ethereumProvider)

ethereumProvider.enable = () => {
  console.log('enabling...')

  window.addEventListener(messages.EV_UPDATE_WEB3, () => console.log('EV_UPDATE_WEB3 listo'))
  return new Promise((resolve, reject) => {
    console.log('asking for eth_accounts')
    safeProvider.sendAsync({ method: 'eth_accounts', params: [] }, (error, response) => {
      if (error) {
        console.log('error', error)
        reject(error)
      } else {
        console.log('response bien', response)
        resolve(response.result)
      }
    })
  })
}

window.ethereum = ethereumProvider

const scriptReadyEvent = new window.CustomEvent(messages.EV_SCRIPT_READY)
window.dispatchEvent(scriptReadyEvent)

window.addEventListener('load', () => {
  if (window.ethereum) {
    // Modern dapp browsers...
    window.web3 = new Web3(window.ethereum)
    try {
      // Request account access if needed
      window.ethereum.enable().then((result) => {
        // Acccounts now exposed
        // window.web3.eth.sendTransaction({ ... })
      })
    } catch (error) {
      // User denied account access...
    }
  } else if (window.web3) {
    // Legacy dapp browsers...

    window.web3 = new Web3(window.web3.currentProvider)
    // Acccounts always exposed
    // window.web3.eth.sendTransaction({ ... })
  } else {
    // Non-dapp browsers...
  }
})

