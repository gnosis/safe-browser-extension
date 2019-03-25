import {
  ADD_TRANSACTION,
  REMOVE_TRANSACTION,
  REMOVE_ALL_TRANSACTIONS,
  SET_PAYMENT_TOKEN
} from 'actions/transactions'

const initialState = {
  windowId: undefined,
  txs: [],
  paymentToken: undefined
}

function transactions(state = initialState, action) {
  let transactions

  switch (action.type) {
    case ADD_TRANSACTION:
      const transaction = {
        tx: action.tx
      }
      if (action.dappWindowId && action.dappTabId) {
        transaction.dappWindowId = action.dappWindowId
        transaction.dappTabId = action.dappTabId
      }
      transactions = {
        ...state,
        txs: [...state.txs, transaction]
      }
      if (action.windowId) {
        transactions.windowId = action.windowId
      }
      return transactions

    case REMOVE_TRANSACTION:
      transactions = state.txs
      transactions.splice(action.position, 1)
      return {
        ...state,
        txs: transactions
      }

    case REMOVE_ALL_TRANSACTIONS:
      return {
        ...state,
        windowId: undefined,
        txs: []
      }

    case SET_PAYMENT_TOKEN:
      const newState = {
        ...state,
        paymentToken: undefined
      }
      if (action.paymentToken) {
        newState.paymentToken = {
          address: action.paymentToken.address,
          decimals: action.paymentToken.decimals,
          logoUri: action.paymentToken.logoUri,
          name: action.paymentToken.name,
          symbol: action.paymentToken.symbol
        }
      }
      return newState

    default:
      return state
  }
}

export default transactions
