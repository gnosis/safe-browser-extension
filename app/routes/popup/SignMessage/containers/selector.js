import { createStructuredSelector } from 'reselect'
import {
  signMessagesSelector,
  safesSelector,
  accountSelector
} from '../store/selectors'
import { selectCurrentSafeAliasSelector } from 'components/Header/SafesMenu/store/selectors'

export default createStructuredSelector({
  signMessages: signMessagesSelector,
  safes: safesSelector,
  account: accountSelector,
  currentSafeAlias: selectCurrentSafeAliasSelector,
})
