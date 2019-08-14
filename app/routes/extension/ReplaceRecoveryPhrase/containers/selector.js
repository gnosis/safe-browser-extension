import { createStructuredSelector } from 'reselect'
import { safesSelector } from '../store/selectors'
import {
  selectEncryptedMnemonicSelector,
  selectUnencryptedMnemonicSelector
} from 'routes/extension/DownloadApps/store/selectors'

export default createStructuredSelector({
  safes: safesSelector,
  selectEncryptedMnemonic: selectEncryptedMnemonicSelector,
  selectUnencryptedMnemonic: selectUnencryptedMnemonicSelector
})
