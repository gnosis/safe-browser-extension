import Subprovider from 'web3-provider-engine/subproviders/subprovider'
import config from '../../config'

class GnosisProvider extends Subprovider {
  constructor(opts) {
    super()
  }

  handleRequest(payload, next, end) {
    const self = this
    let accounts
    let result = null

    switch (payload.method) {

      case 'eth_accounts':
        accounts = [config.safeAddress]

        end(null, accounts)
        return

      case 'eth_coinbase':
        accounts = [config.safeAddress]

        end(null, accounts)
        return

      case 'eth_sendTransaction':
        debugger

        return

      default:
        next()
        return

    }

  }

}

module.exports = GnosisProvider