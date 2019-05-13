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
