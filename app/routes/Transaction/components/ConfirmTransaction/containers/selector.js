import { createStructuredSelector } from 'reselect'
import {
  safesSelector,
  transactionsSelector
} from 'routes/Transaction/store/selectors'

export default createStructuredSelector({
  transactions: transactionsSelector,
  safes: safesSelector
})
