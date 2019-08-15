import { createStructuredSelector } from 'reselect'
import { selectEncryptedMnemonicSelector } from 'routes/extension/DownloadApps/store/selectors'
import {
  accountSelector,
  deviceSelector,
  safesSelector
} from '../store/selectors'

export default createStructuredSelector({
  account: accountSelector,
  safes: safesSelector,
  device: deviceSelector,
  selectEncryptedMnemonic: selectEncryptedMnemonicSelector
})
