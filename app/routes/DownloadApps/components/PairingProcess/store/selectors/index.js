import { createSelector } from 'reselect'

const existsAccount = (account) => {
  if (!account)
    return false

  if (!account.secondFA)
    return false

  return Object.keys(account.secondFA).length > 0
}

export const accountSelector = (state) => state.account
export const safesSelector = (state) => state.safes

export const hasAccountSelector = createSelector(
  accountSelector,
  (account) => existsAccount(account)
)

export const hasLockedAccountSelector = createSelector(
  accountSelector,
  (account) => existsAccount(account) && account.lockedState
)

export const selectEncryptedMnemonicSelector = createSelector(
  accountSelector,
  (account) => {
    return (existsAccount(account))
      ? account.secondFA.seed
      : undefined
  }
)

export const selectUnencryptedMnemonicSelector = createSelector(
  accountSelector,
  (account) => {
    return (existsAccount(account))
      ? account.secondFA.unlockedMnemonic
      : undefined
  }
)
