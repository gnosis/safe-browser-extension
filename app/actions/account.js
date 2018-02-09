export const CREATE_ACCOUNT = 'CREATE_ACCOUNT'
export const RESTORE_ACCOUNT = 'RESTORE_ACCOUNT'

export const createAccount = (password, v3) => ({
  type: CREATE_ACCOUNT,
  password,
  v3
})

export const restoreAccount = (password, v3) => ({
  type: RESTORE_ACCOUNT,
  password,
  v3
})