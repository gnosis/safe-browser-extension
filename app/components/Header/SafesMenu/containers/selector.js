import { createStructuredSelector } from 'reselect'
import {
  safesSelector,
  selectCurrentSafeAlias,
  selectCurrentTransactionSafeAlias
} from '../store/selectors'

export default (state, props) => createStructuredSelector({
  safes: safesSelector,
  currentSafeAlias: selectCurrentSafeAlias,
  currentTransactionSafeAlias: selectCurrentTransactionSafeAlias()
})
