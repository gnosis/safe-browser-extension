import { createStructuredSelector } from 'reselect'
import {
  selectEncryptedMnemonicSelector,
  selectUnencryptedMnemonicSelector,
  accountSelector
} from 'routes/extension/DownloadApps/components/PairingProcess/store/selectors'

export default createStructuredSelector({
  selectEncryptedMnemonic: selectEncryptedMnemonicSelector,
  selectUnencryptedMnemonic: selectUnencryptedMnemonicSelector,
  account: accountSelector
})
