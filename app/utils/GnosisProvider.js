import Subprovider from 'web3-provider-engine/subproviders/subprovider'

import config from '../../config'

class GnosisProvider extends Subprovider {
  constructor(opts) {
    super()
  }

  sendTransaction = (payload) => {
    const showPopupEvent = new CustomEvent(
      'showPopup',
      { detail: payload.params[0] }
    )

    document.dispatchEvent(showPopupEvent)
  }

  handleRequest(payload, next, end) {
    let accounts

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
        this.sendTransaction(payload)

        return

      default:
        next()
        return

    }

  }

}

module.exports = GnosisProvider