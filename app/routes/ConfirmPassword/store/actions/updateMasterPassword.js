export const UPDATE_MASTER_PASSWORD = 'UPDATE_MASTER_PASSWORD'

export const updateMasterPassword = (seed, hmac) => ({
  type: UPDATE_MASTER_PASSWORD,
  seed,
  hmac,
})
