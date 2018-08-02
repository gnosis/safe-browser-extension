import { createStructuredSelector } from 'reselect'
import {
  selectEncryptedMnemonicSelector,
  selectUnencryptedMnemonicSelector,
  accountSelector
} from 'routes/DownloadApps/components/PairingProcess/store/selectors'

export default createStructuredSelector({
  selectEncryptedMnemonic: selectEncryptedMnemonicSelector,
  selectUnencryptedMnemonic: selectUnencryptedMnemonicSelector,
  account: accountSelector
})
