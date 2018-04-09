import { combineReducers } from 'redux'

import account from 'routes/PairingProcess/store/reducers'
import whitelistedDapps from 'routes/WhitelistedDapps/store/reducers'
import transactions from 'reducers/transactions'
import safes from './safes'

import { LOGOUT_ACCOUNT } from 'actions/account'

const reducers = combineReducers({
  account,
  safes,
  whitelistedDapps,
  transactions,
})

const rootReducer = (state, action) => {
  let resultState = state

  if (action.type === LOGOUT_ACCOUNT) {
    resultState = {}
  }

  return reducers(resultState, action)
}

export default rootReducer