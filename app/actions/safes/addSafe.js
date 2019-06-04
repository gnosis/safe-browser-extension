export const ADD_SAFE = 'ADD_SAFE'

export const addSafe = (address, accountIndex) => ({
  type: ADD_SAFE,
  address,
  accountIndex
})
