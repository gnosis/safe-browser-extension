export const UNLOCK_ACCOUNT = 'UNLOCK_ACCOUNT'

export const unlockAccount = (seed, unlockingTime) => ({
  type: UNLOCK_ACCOUNT,
  seed,
  unlockingTime,
})
