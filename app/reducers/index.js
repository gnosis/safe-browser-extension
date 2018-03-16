import { combineReducers } from 'redux'

import account from 'reducers/account'
import whitelistedDApps from 'reducers/whitelistedDApps'
import transactions from 'reducers/transactions'

import { LOGOUT_ACCOUNT } from 'actions/account'

const reducers = combineReducers({
  account,
  whitelistedDApps,
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