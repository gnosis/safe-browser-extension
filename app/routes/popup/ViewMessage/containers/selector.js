import { createStructuredSelector } from 'reselect'
import { signMessagesSelector } from '../store/selectors'

export default createStructuredSelector({
  signMessages: signMessagesSelector
})
