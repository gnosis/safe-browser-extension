import { createStructuredSelector } from 'reselect'
import { selectEncryptedMnemonicSelector } from 'routes/extension/DownloadApps/components/PairingProcess/store/selectors'
import { accountSelector, deviceSelector } from '../store/selectors'

export default createStructuredSelector({
  account: accountSelector,
  device: deviceSelector,
  selectEncryptedMnemonic: selectEncryptedMnemonicSelector
})
