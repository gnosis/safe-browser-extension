import {
  ADD_TRANSACTION,
  REMOVE_TRANSACTION,
  REMOVE_ALL_TRANSACTIONS,
} from 'actions/transactions'

function transactions(state = [], action) {
  let newState

  switch (action.type) {

    case ADD_TRANSACTION:
      newState = [...state]
      newState.push({
        tx: action.tx,
        popupId: action.popupId,
      })
      return newState

    case REMOVE_TRANSACTION:
      return state.filter(t => t.popupId !== action.popupId)

    case REMOVE_ALL_TRANSACTIONS:
      return []

    default:
      return state

  }
}

export default transactions