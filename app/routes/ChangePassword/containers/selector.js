import { createStructuredSelector } from 'reselect'
import {
  selectEncryptedMnemonicSelector,
  selectUnencryptedMnemonicSelector,
  accountSelector,
} from 'routes/PairingProcess/store/selectors'

export default createStructuredSelector({
  selectEncryptedMnemonic: selectEncryptedMnemonicSelector,
  selectUnencryptedMnemonic: selectUnencryptedMnemonicSelector,
  account: accountSelector,
})
