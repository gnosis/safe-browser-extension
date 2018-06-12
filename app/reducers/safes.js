import { ADD_SAFE } from 'routes/DownloadApps/components/PairingProcess/store/actions'
import {
  DELETE_SAFE,
  SELECT_SAFE,
} from 'routes/SafesList/store/actions'

const initialState = {
  currentSafe: undefined,
  safes: [],
}
function safes(state = initialState, action) {
  switch (action.type) {

    case ADD_SAFE:
      const newSafe = {
        address: action.address,
      }
      return {
        ...state,
        currentSafe: action.address,
        safes: [
          ...state.safes,
          newSafe,
        ],
      }

    case DELETE_SAFE:
      let safes = state.safes.filter(address => (address !== action.address))
      return {
        ...state,
        safes,
      }

    case SELECT_SAFE:
      return {
        ...state,
        currentSafe: action.address,
      }

    default:
      return state

  }
}

export default safes
