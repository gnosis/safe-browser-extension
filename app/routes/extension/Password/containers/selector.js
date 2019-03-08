import { createStructuredSelector } from 'reselect'
import { selectEncryptedMnemonicSelector } from 'routes/extension/DownloadApps/components/PairingProcess/store/selectors'
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
