import { ADD_SAFE } from 'routes/DownloadApps/components/PairingProcess/store/actions'
import {
  REMOVE_SAFE,
  SELECT_SAFE,
} from 'components/Header/SafesMenu/store/actions'

const initialState = {
  currentSafe: undefined,
  safes: [],
}
function safes(state = initialState, action) {
  switch (action.type) {

    case ADD_SAFE:
      const newSafe = {
        address: action.address,
        alias: 'Account ' + state.safes.length,
      }
      return {
        ...state,
        currentSafe: action.address,
        safes: [
          ...state.safes,
          newSafe,
        ],
      }

    case REMOVE_SAFE:
      const safes = state.safes.filter(safe => (safe.address !== action.address))
      return {
        currentSafe: action.newCurrentSafe,
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
