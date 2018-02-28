export const CREATE_ACCOUNT = 'CREATE_ACCOUNT'
export const LOGOUT_ACCOUNT = 'LOGOUT_ACCOUNT'

export const createAccount = (address, seed) => ({
  type: CREATE_ACCOUNT,
  address,
  seed,
})

export const logOutAccount = () => ({
  type: LOGOUT_ACCOUNT
})