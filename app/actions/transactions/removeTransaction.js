export const REMOVE_TRANSACTION = 'REMOVE_TRANSACTION'

export const removeTransaction = (position) => ({
  type: REMOVE_TRANSACTION,
  position
})
