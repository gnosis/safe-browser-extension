import Subprovider from 'web3-provider-engine/subproviders/subprovider'
import uuid from 'uuid/v4'
import {
  EV_SHOW_POPUP,
  EV_RESOLVED_TRANSACTION
} from '../../extension/utils/messages'

class GnosisProvider extends Subprovider {
  constructor (props) {
    super(props)
    this.currentSafe = undefined
  }

  updateCurrentSafe = (currentSafe) => {
    this.currentSafe = currentSafe
  }

  handleRequest = (payload, next, end) => {
    const accounts = [this.currentSafe]

    switch (payload.method) {
      case 'eth_accounts':
        end(null, accounts)
        return

      case 'eth_coinbase':
        end(null, accounts)
        return

      case 'eth_sendTransaction':
        this.sendTransaction(payload, end)
        return

      default:
        next()
    }
  }

  sendTransaction = (payload, end) => {
    const id = uuid()
    payload.params[0].id = id
    const showPopupEvent = new window.CustomEvent(
      EV_SHOW_POPUP,
      { detail: payload.params[0] }
    )
    document.dispatchEvent(showPopupEvent)

    const resolveTransactionHandler = (data) => {
      document.removeEventListener(EV_RESOLVED_TRANSACTION + data.detail.id, resolveTransactionHandler)
      if (data.detail.hash) {
        end(null, data.detail.hash)
      } else {
        end(new Error('The transaction was rejected. ' + data.detail.id))
      }
    }
    document.addEventListener(EV_RESOLVED_TRANSACTION + id, resolveTransactionHandler)
  }
}

module.exports = GnosisProvider
