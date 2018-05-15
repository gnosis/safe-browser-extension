import { createStructuredSelector } from 'reselect'
import { selectUnencryptedMnemonicSelector } from '../../store/selectors'

export default createStructuredSelector({
  selectUnencryptedMnemonic: selectUnencryptedMnemonicSelector,
})
