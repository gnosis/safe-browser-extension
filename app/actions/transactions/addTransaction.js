export const ADD_TRANSACTION = 'ADD_TRANSACTION'

export const addTransaction = (tx, windowId, dappWindowId, dappTabId) => ({
  type: ADD_TRANSACTION,
  tx,
  windowId,
  dappWindowId,
  dappTabId
})
