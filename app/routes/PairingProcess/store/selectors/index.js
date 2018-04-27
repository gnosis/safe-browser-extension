import { createSelector } from 'reselect'

export const accountSelector = (state) => state.account
export const safesSelector = (state) => state.safes

export const hasAccountSelector = createSelector(
  accountSelector,
  (account) => {
    if (!account)
      return false

    if (!account.secondFA)
      return false

    return Object.keys(account.secondFA).length > 0
  }
)

export const hasLockedAccountSelector = createSelector(
  accountSelector,
  (account) => hasAccountSelector && account.lockedState
)

export const selectEncryptedMnemonicSelector = createSelector(
  accountSelector,
  (account) => {
    return (hasAccountSelector)
      ? account.secondFA.seed
      : undefined
  }
)

export const selectUnencryptedMnemonicSelector = createSelector(
  accountSelector,
  (account) => {
    return (hasAccountSelector)
      ? account.secondFA.unlockedSeed
      : undefined
  }
)
