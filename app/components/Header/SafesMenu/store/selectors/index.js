import { createSelector } from 'reselect'

export const safesSelector = (state) => state.safes

export const transactionsSelector = (state) => state.transactions

export const selectCurrentSafeAlias = createSelector(
  safesSelector,
  (safes) => safes.listSafes.filter(safe => safe.address === safes.currentSafe)[0].alias
)

export const selectCurrentTransactionSafeAlias = () => createSelector(
  transactionsSelector,
  safesSelector,
  (state, props) => props.transactionNumber,
  (transactions, safes, transactionNumber) => {
    if (transactionNumber === undefined) {
      return null
    }
    const address = transactions.txs[transactionNumber].tx.from
    return safes.listSafes.filter(safe => address === safe.address)[0].alias
  }
)
