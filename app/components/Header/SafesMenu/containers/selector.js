import { createStructuredSelector } from 'reselect'
import {
  safesSelector,
  selectCurrentSafeAlias,
  selectCurrentTransactionSafeAlias
} from '../store/selectors'

export default (state, props) => createStructuredSelector({
  safes: safesSelector,
  extensionTitle: selectCurrentSafeAlias,
  popupTitle: selectCurrentTransactionSafeAlias()
})
