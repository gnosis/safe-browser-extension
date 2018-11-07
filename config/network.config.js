import {
  MAINNET,
  RINKEBY,
  NETWORK_NAME,
  NETWORK_VERSION,
  NETWORK_URL
} from './names'

export const networkConfig = {
  [MAINNET]: {
    [NETWORK_NAME]: 'Mainnet',
    [NETWORK_VERSION]: 1,
    [NETWORK_URL]: 'https://infura.io/gnosis'
  },
  [RINKEBY]: {
    [NETWORK_NAME]: 'Rinkeby',
    [NETWORK_VERSION]: 4,
    [NETWORK_URL]: 'https://rinkeby.infura.io/gnosis'
  }
}

export default networkConfig
