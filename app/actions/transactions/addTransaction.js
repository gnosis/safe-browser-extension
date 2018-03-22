export const ADD_TRANSACTION = 'ADD_TRANSACTION'

export const addTransaction = (tx, popupId) => ({
  type: ADD_TRANSACTION,
  tx,
  popupId
})
