export const CREATE_ACCOUNT = 'CREATE_ACCOUNT'
export const RESTORE_ACCOUNT = 'RESTORE_ACCOUNT'
export const REQUEST_RESTORE_ACCOUNT = 'REQUEST_RESTORE_ACCOUNT'
export const LOGOUT_ACCOUNT = 'LOGOUT_ACCOUNT'

export const createAccount = (address, seed) => ({
  type: CREATE_ACCOUNT,
  address,
  seed,
})

export const requestRestoreAccount = (password) => ({
  type: REQUEST_RESTORE_ACCOUNT,
  password,
})

export const restoreAccount = (address, seed) => ({
  type: RESTORE_ACCOUNT,
  address,
  seed,
})

export const logOutAccount = () => ({
  type: LOGOUT_ACCOUNT
})