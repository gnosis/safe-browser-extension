import { createStructuredSelector } from 'reselect'
import {
  safesSelector,
  accountSelector,
  signMessagesSelector
} from '../store/selectors'

export default createStructuredSelector({
  safes: safesSelector,
  account: accountSelector,
  signMessages: signMessagesSelector
})
