import { createStructuredSelector } from 'reselect'
import {
  safesSelector,
  selectCurrentSafeAlias
} from '../store/selectors'

export default createStructuredSelector({
  safes: safesSelector,
  currentSafeAlias: selectCurrentSafeAlias
})
