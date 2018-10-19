import uuid from 'uuid/v4'
import {
  EV_SHOW_POPUP,
  EV_RESOLVED_TRANSACTION,
  EV_UPDATE_WEB3
} from './messages'

class SafeSubprovider {
  constructor () {
    this.currentSafe = undefined

    const self = this
    document.addEventListener(EV_UPDATE_WEB3, function (data) {
      self.updateCurrentSafe(data.detail)
    })
  }

  updateCurrentSafe = (currentSafe) => {
    this.currentSafe = currentSafe
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

  setEngine = (engine) => {
    this.engine = engine
  }
}

module.exports = SafeSubprovider
