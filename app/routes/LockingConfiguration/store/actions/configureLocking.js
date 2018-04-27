export const CONFIGURE_LOCKING = 'CONFIGURE_LOCKING'

export const configureLocking = (autoLockInterval) => ({
  type: CONFIGURE_LOCKING,
  autoLockInterval,
})
