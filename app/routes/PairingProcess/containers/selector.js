import { createStructuredSelector } from 'reselect'
import {
  safesSelector,
  hasAccountSelector,
  hasLockedAccountSelector,
  selectEncryptedMnemonicSelector,
  selectUnencryptedMnemonicSelector,
} from '../store/selectors'

export default createStructuredSelector({
  safes: safesSelector,
  hasAccount: hasAccountSelector,
  hasLockedAccount: hasLockedAccountSelector,
  selectEncryptedMnemonic: selectEncryptedMnemonicSelector,
  selectUnencryptedMnemonic: selectUnencryptedMnemonicSelector,
})
