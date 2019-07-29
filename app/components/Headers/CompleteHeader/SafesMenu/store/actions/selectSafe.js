export const SELECT_SAFE = 'SELECT_SAFE'

export const selectSafe = (address) => {
  return {
    type: SELECT_SAFE,
    address
  }
}
