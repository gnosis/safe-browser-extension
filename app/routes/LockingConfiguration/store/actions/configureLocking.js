export const CONFIGURE_LOCKING = 'CONFIGURE_LOCKING'

export const configureLocking = (autoLockInterval, unlockingTime) => ({
  type: CONFIGURE_LOCKING,
  autoLockInterval,
  unlockingTime,
})
