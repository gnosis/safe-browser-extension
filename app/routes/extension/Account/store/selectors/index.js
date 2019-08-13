import { createSelector } from 'reselect'

export const accountSelector = (state) => state.account

export const safesSelector = (state) => state.safes

export const transactionsSelector = (state) => state.transactions

export const selectCurrentSafeAlias = createSelector(
  safesSelector,
  (safes) => {
    return safes.currentSafe
      ? safes.safes.filter((safe) => safe.address === safes.currentSafe)[0]
          .alias
      : ''
  }
)
