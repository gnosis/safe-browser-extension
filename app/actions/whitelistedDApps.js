export const ADD_WHITELISTED_DAPP = 'ADD_WHITELISTED_DAPP'
export const DELETE_WHITELISTED_DAPP = 'DELETE_WHITELISTED_DAPP'

export const addWhitelistedDApp = (dapp) => ({
  type: ADD_WHITELISTED_DAPP,
  dapp
})

export const deleteWhitelistedDApp = (dapp) => ({
  type: DELETE_WHITELISTED_DAPP,
  dapp,
})