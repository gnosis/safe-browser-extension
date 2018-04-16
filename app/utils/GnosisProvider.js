import Subprovider from 'web3-provider-engine/subproviders/subprovider'
import { EV_SHOW_POPUP } from '../../extension/utils/messages'

class GnosisProvider extends Subprovider {
  constructor(props) {
    super(props)
    this.currentSafe = undefined
  }

  updateCurrentSafe = (currentSafe) => {
    this.currentSafe = currentSafe
  }

  handleRequest(payload, next, end) {
    const accounts = [this.currentSafe]

    switch (payload.method) {

      case 'eth_accounts':
        end(null, accounts)
        return

      case 'eth_coinbase':
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

  sendTransaction = (payload) => {
    const showPopupEvent = new CustomEvent(
      EV_SHOW_POPUP,
      { detail: payload.params[0] }
    )
    document.dispatchEvent(showPopupEvent)
  }
}

module.exports = GnosisProvider
