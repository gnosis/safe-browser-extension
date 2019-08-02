import { createStructuredSelector } from 'reselect'
import {
  accountSelector,
  safesSelector,
  transactionsSelector,
  selectCurrentSafeAlias
} from '../store/selectors'

export default createStructuredSelector({
  account: accountSelector,
  safes: safesSelector,
  transactions: transactionsSelector,
  currentSafeAlias: selectCurrentSafeAlias
})
