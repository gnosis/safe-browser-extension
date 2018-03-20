import { combineReducers } from 'redux'

import account from 'routes/DownloadApps/store/reducers'
import whitelistedDapps from 'routes/WhitelistedDapps/store/reducers'
import transactions from 'reducers/transactions'

import { LOGOUT_ACCOUNT } from 'routes/DownloadApps/store/actions'

const reducers = combineReducers({
  account,
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