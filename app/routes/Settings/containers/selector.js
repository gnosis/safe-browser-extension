import { createStructuredSelector } from 'reselect'
import {
  hasLockedAccountSelector,
} from 'routes/DownloadApps/components/PairingProcess/store/selectors'

export default createStructuredSelector({
  hasLockedAccount: hasLockedAccountSelector,
})
