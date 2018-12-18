import uuid from 'uuid/v4'
import messages from './messages'

class SafeSubprovider {
  sendTransaction = (payload, end) => {
    const id = uuid()
    payload.params[0].id = id
    const showPopupEvent = new window.CustomEvent(
      messages.EV_SHOW_POPUP_TX,
      { detail: payload.params[0] }
    )
    window.dispatchEvent(showPopupEvent)

    const resolveTransactionHandler = (data) => {
      window.removeEventListener(messages.EV_RESOLVED_TRANSACTION + data.detail.id, resolveTransactionHandler)
      if (data.detail.hash) {
        end(null, data.detail.hash)
      } else {
        end(new Error('Transaction rejected', data.detail.id))
      }
    }
    window.addEventListener(messages.EV_RESOLVED_TRANSACTION + id, resolveTransactionHandler)
  }

  handleRequest = (payload, next, end) => {
    const account = this.engine.currentSafe

    switch (payload.method) {
      case 'eth_accounts':
        end(null, account ? [account] : [])
        return

      case 'eth_coinbase':
        end(null, account)
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
