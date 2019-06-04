import {
  ADD_WHITELISTED_DAPP,
  DELETE_WHITELISTED_DAPP,
  DELETE_ALL_WHITELISTED_DAPPS
} from 'actions/whitelistedDapps'

function whitelistedDapps(state = [], action) {
  switch (action.type) {
    case ADD_WHITELISTED_DAPP:
      let newState = [...state]
      newState.push(action.dapp)
      return newState

    case DELETE_WHITELISTED_DAPP:
      return state.filter((dapp) => dapp !== action.dapp)

    case DELETE_ALL_WHITELISTED_DAPPS:
      return []

    default:
      return state
  }
}

export default whitelistedDapps
