import Web3 from 'web3'
import SafeProvider from 'safe-web3-provider'

import { getNetworkUrl } from '../config'

if (typeof window.web3 !== 'undefined') {
  throw new Error(
    'Gnosis Safe detected another web3. Use the SafeProvider directly or unistall the other providers.'
  )
}

const safeProvider = new SafeProvider({
  rpcUrl: getNetworkUrl()
})

window.ethereum = safeProvider
window.web3 = new Web3(safeProvider)

/*
window.addEventListener('load', () => {
  console.log('loaded')
  if (window.ethereum) {
    // Modern dapp browsers...
    window.web3 = new Web3(window.ethereum)
    console.log('window.ethereum')
    try {
      // Request account access if needed
      console.log('enable()')
      window.ethereum.enable().then((result) => {
        // Acccounts now exposed
        // window.web3.eth.sendTransaction({ ... })
        console.log('enabled!', result)
      })
    } catch (error) {
      console.log('error', error)
      // User denied account access...
    }
  } else if (window.web3) {
    // Legacy dapp browsers...

    window.web3 = new Web3(window.web3.currentProvider)
    // Acccounts always exposed
    // window.web3.eth.sendTransaction({ ... })
    console.log('window.web3')
  } else {
    // Non-dapp browsers...
    console.log('empty')
  }
})
*/
