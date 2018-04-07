export const ADD_SAFE = 'ADD_SAFE'

export const addSafe = (address, connectionType) => ({
  type: ADD_SAFE,
  address,
  connectionType,
})
