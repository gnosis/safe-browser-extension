import { createStructuredSelector } from 'reselect'
import {
  accountSelector,
  safesSelector,
  transactionsSelector
} from '../store/selectors'

export default createStructuredSelector({
  account: accountSelector,
  safes: safesSelector,
  transactions: transactionsSelector
})
