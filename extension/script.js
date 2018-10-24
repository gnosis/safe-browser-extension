import Web3 from 'web3'

import SafeProvider from './utils/SafeProvider'
import { EV_SCRIPT_READY } from './utils/messages'
import { getNetworkUrl } from '../config'

// window.addEventListener('load', function () {
//  console.log("Web page loaded")
// })

if (typeof window.web3 !== 'undefined') {
  // throw new Error('web3 already exists.')
  console.error('Gnosis Safe overrode an existing web3, please disable the whitelisting or uninstall one to prevent this.')
}

const safeProvider = new SafeProvider({
  rpcUrl: getNetworkUrl()
})

var web3 = new Web3(safeProvider)
global.web3 = web3

const scriptReadyEvent = new window.CustomEvent(EV_SCRIPT_READY)
document.dispatchEvent(scriptReadyEvent)
