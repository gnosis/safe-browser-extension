export const CONFIGURE_LOCKING = 'CONFIGURE_LOCKING'

export const configureLocking = (lockingConfig) => ({
  type: CONFIGURE_LOCKING,
  lockingConfig,
})
