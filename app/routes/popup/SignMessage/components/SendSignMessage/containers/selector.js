import { createStructuredSelector } from 'reselect'
import {
  safesSelector,
  signMessagesSelector
} from '../../../store/selectors'

export default createStructuredSelector({
  safes: safesSelector,
  signMessages: signMessagesSelector
})
