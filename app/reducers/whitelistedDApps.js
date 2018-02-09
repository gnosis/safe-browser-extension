import {
  ADD_WHITELISTED_DAPP,
  DELETE_WHITELISTED_DAPP,
} from '../actions/whitelistedDApps'

function whitelistedDApps(state = [], action) {
  switch (action.type) {

    case ADD_WHITELISTED_DAPP:
      let newState = [...state]
      newState.push(action.dapp)
      return newState

    case DELETE_WHITELISTED_DAPP:
      return state.filter(dapp => (dapp !== action.dapp))

    default:
      return state

  }
}

export default whitelistedDApps