export const CREATE_ACCOUNT = 'CREATE_ACCOUNT'

export const createAccount = (address, seed, hmac) => ({
  type: CREATE_ACCOUNT,
  address,
  seed,
  hmac,
})
