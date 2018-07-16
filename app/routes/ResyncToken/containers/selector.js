import { createStructuredSelector } from 'reselect'
import {
  accountSelector,
  selectEncryptedMnemonicSelector,
  selectUnencryptedMnemonicSelector,
} from 'routes/DownloadApps/components/PairingProcess/store/selectors'

export default createStructuredSelector({
  account: accountSelector,
  selectEncryptedMnemonic: selectEncryptedMnemonicSelector,
  selectUnencryptedMnemonic: selectUnencryptedMnemonicSelector,
})
