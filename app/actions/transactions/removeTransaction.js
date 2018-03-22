export const REMOVE_TRANSACTION = 'REMOVE_TRANSACTION'

export const removeTransaction = (popupId) => ({
  type: REMOVE_TRANSACTION,
  popupId
})
