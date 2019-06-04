import { combineReducers } from 'redux'

import account from './account'
import whitelistedDapps from './whitelistedDapps'
import transactions from './transactions'
import safes from './safes'
import device from './device'
import signMessages from './signMessages'

import { LOGOUT_ACCOUNT } from 'actions/account'

const reducers = combineReducers({
  account,
  safes,
  whitelistedDapps,
  transactions,
  device,
  signMessages
})

const rootReducer = (state, action) => {
  let resultState = state

  if (action.type === LOGOUT_ACCOUNT) {
    resultState = {}
  }

  return reducers(resultState, action)
}

export default rootReducer
