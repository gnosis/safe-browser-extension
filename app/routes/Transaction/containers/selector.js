import { createStructuredSelector } from 'reselect'
import {
  safesSelector,
  accountSelector,
  transactionsSelector,
} from '../store/selectors'

export default createStructuredSelector({
  safes: safesSelector,
  account: accountSelector,
  transactions: transactionsSelector,
})
