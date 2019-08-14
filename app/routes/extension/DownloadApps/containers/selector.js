import { createStructuredSelector } from 'reselect'
import {
  safesSelector,
  accountSelector,
  selectEncryptedMnemonicSelector
} from '../store/selectors'

export default createStructuredSelector({
  safes: safesSelector,
  account: accountSelector,
  selectEncryptedMnemonic: selectEncryptedMnemonicSelector
})
