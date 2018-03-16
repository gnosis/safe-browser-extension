export const ADD_TRANSACTION = 'ADD_TRANSACTION'
export const REMOVE_TRANSACTION = 'REMOVE_TRANSACTION'
export const REMOVE_ALL_TRANSACTIONS = 'REMOVE_ALL_TRANSACTIONS'

export const addTransaction = (tx, popupId) => ({
  type: ADD_TRANSACTION,
  tx,
  popupId
})

export const removeTransaction = (popupId) => ({
  type: REMOVE_TRANSACTION,
  popupId
})

export const removeAllTransactions = () => ({
  type: REMOVE_ALL_TRANSACTIONS,
})