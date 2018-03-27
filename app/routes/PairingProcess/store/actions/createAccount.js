export const CREATE_ACCOUNT = 'CREATE_ACCOUNT'

export const createAccount = (address, seed) => ({
  type: CREATE_ACCOUNT,
  address,
  seed,
})
