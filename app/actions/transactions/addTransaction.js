export const ADD_TRANSACTION = 'ADD_TRANSACTION'

export const addTransaction = (tx, windowId) => ({
  type: ADD_TRANSACTION,
  tx,
  windowId
})
