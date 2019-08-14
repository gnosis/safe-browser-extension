import { createStructuredSelector } from 'reselect'
import {
  accountSelector,
  safesSelector,
  selectEncryptedMnemonicSelector,
  selectUnencryptedMnemonicSelector
} from 'routes/extension/DownloadApps/store/selectors'

export default createStructuredSelector({
  account: accountSelector,
  safes: safesSelector,
  selectEncryptedMnemonic: selectEncryptedMnemonicSelector,
  selectUnencryptedMnemonic: selectUnencryptedMnemonicSelector
})
