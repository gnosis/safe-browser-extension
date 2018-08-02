import { createStructuredSelector } from 'reselect'
import {
  safesSelector,
  transactionsSelector
} from 'routes/popup/Transaction/store/selectors'

export default createStructuredSelector({
  safes: safesSelector,
  transactions: transactionsSelector
})
