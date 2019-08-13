import { createSelector } from 'reselect'

const existsAccount = (account) => {
  if (!account) {
    return false
  }

  if (!account.secondFA) {
    return false
  }

  return account.secondFA.seed
}

export const accountSelector = (state) => state.account
export const safesSelector = (state) => state.safes

export const selectEncryptedMnemonicSelector = createSelector(
  accountSelector,
  (account) => {
    return existsAccount(account) ? account.secondFA.seed : undefined
  }
)

export const selectUnencryptedMnemonicSelector = createSelector(
  accountSelector,
  (account) => {
    return existsAccount(account)
      ? account.secondFA.unlockedMnemonic
      : undefined
  }
)
