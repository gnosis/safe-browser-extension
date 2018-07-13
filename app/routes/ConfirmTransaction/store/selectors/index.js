import { createSelector } from 'reselect'

export const safesSelector = (state) => state.safes

export const accountSelector = (state) => state.account

export const transactionsSelector = (state) => state.transactions

export const selectCurrentSafeAlias = createSelector(
  safesSelector,
  (safes) => safes.safes.filter(safe => safe.address === safes.currentSafe)[0].alias
)
