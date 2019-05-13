import { createStructuredSelector } from 'reselect'
import { transactionsSelector } from '../store/selectors'

export default (state, props) =>
  createStructuredSelector({
    transactions: transactionsSelector
  })
