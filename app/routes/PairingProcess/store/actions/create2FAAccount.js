export const CREATE_2FA_ACCOUNT = 'CREATE_2FA_ACCOUNT'

export const create2FAAccount = (address, seed, hmac) => ({
  type: CREATE_2FA_ACCOUNT,
  address,
  seed,
  hmac,
})
