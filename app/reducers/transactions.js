import {
  ADD_TRANSACTION,
  REMOVE_TRANSACTION,
  REMOVE_ALL_TRANSACTIONS,
} from 'actions/transactions'

const initialState = {
  windowId: undefined,
  txs: [],
}

function transactions(state = initialState, action) {
  let transactions

  switch (action.type) {

    case ADD_TRANSACTION:
      transactions = {
        ...state,
        txs: [
          ...state.txs,
          action.tx,
        ],
      }
      if (action.windowId)
        transactions.windowId = action.windowId
      return transactions

    case REMOVE_TRANSACTION:
      transactions = state.txs
      transactions.splice(action.position, 1)
      return {
        ...state,
        txs: transactions,
      }

    case REMOVE_ALL_TRANSACTIONS:
      return {
        windowId: undefined,
        txs: [],
      }

    default:
      return state

  }
}

export default transactions
