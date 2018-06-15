import { createStructuredSelector } from 'reselect'
import { selectEncryptedMnemonicSelector } from '../../PairingProcess/store/selectors'

export default createStructuredSelector({
  selectEncryptedMnemonic: selectEncryptedMnemonicSelector,
})
