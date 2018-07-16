import { createStructuredSelector } from 'reselect'
import {
  safesSelector,
  hasAccountSelector,
  hasLockedAccountSelector,
} from '../store/selectors'

export default createStructuredSelector({
  safes: safesSelector,
  hasAccount: hasAccountSelector,
  hasLockedAccount: hasLockedAccountSelector,
})
