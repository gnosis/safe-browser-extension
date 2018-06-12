import { createStructuredSelector } from 'reselect'
import {
  hasLockedAccountSelector,
} from 'routes/PairingProcess/store/selectors'

export default createStructuredSelector({
  hasLockedAccount: hasLockedAccountSelector,
})
