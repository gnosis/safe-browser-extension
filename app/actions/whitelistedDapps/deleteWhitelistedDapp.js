export const DELETE_WHITELISTED_DAPP = 'DELETE_WHITELISTED_DAPP'

export const deleteWhitelistedDapp = (dapp) => ({
  type: DELETE_WHITELISTED_DAPP,
  dapp,
})