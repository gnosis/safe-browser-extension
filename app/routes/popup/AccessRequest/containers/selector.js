import { createStructuredSelector } from 'reselect'
import {
  providerRequestSelector
} from '../store/selectors'

export default createStructuredSelector({
  providerRequest: providerRequestSelector
})
