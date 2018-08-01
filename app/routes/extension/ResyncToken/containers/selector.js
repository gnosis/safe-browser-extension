import { createStructuredSelector } from 'reselect'
import {
  accountSelector,
  selectEncryptedMnemonicSelector,
  selectUnencryptedMnemonicSelector
} from 'routes/extension/DownloadApps/components/PairingProcess/store/selectors'

export default createStructuredSelector({
  account: accountSelector,
  selectEncryptedMnemonic: selectEncryptedMnemonicSelector,
  selectUnencryptedMnemonic: selectUnencryptedMnemonicSelector
})
