import { createStructuredSelector } from 'reselect'
import { selectEncryptedMnemonicSelector } from '../../store/selectors'

export default createStructuredSelector({
  selectEncryptedMnemonic: selectEncryptedMnemonicSelector,
})
