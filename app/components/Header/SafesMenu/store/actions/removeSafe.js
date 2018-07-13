export const REMOVE_SAFE = 'REMOVE_SAFE'

export const removeSafe = (address, currentSafe) => ({
  type: REMOVE_SAFE,
  address,
  currentSafe,
})
