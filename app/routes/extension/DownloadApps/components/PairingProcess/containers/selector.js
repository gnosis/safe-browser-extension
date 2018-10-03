import { createStructuredSelector } from 'reselect'
import {
  safesSelector,
  selectEncryptedMnemonicSelector
} from '../store/selectors'

export default createStructuredSelector({
  safes: safesSelector,
  selectEncryptedMnemonic: selectEncryptedMnemonicSelector
})
