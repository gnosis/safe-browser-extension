import { createStructuredSelector } from 'reselect'
import {
  accountSelector
} from '../store/selectors'

export default createStructuredSelector({
  account: accountSelector
})
