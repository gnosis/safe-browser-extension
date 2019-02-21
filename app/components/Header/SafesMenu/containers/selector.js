import { createStructuredSelector } from 'reselect'
import {
  safesSelector,
  selectCurrentSafeAliasSelector,
  selectCurrentTransactionSafeAlias
} from '../store/selectors'

export default (state, props) =>
  createStructuredSelector({
    safes: safesSelector,
    extensionTitle: selectCurrentSafeAlias,
    popupTitle: selectCurrentTransactionSafeAlias()
  })
