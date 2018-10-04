import { ADD_SAFE } from 'actions/safes'
import {
  REMOVE_SAFE,
  SELECT_SAFE,
  UPDATE_SAFE_ALIAS
} from 'components/Header/SafesMenu/store/actions'

const initialState = {
  currentSafe: undefined,
  listSafes: []
}
function safes (state = initialState, action) {
  switch (action.type) {
    case ADD_SAFE:
      const count = state.listSafes.length + 1
      const newSafe = {
        address: action.address,
        alias: (count === 1)
          ? 'Safe'
          : 'Safe ' + action.address.substring(action.address.length - 4)
      }
      return {
        ...state,
        currentSafe: action.address,
        listSafes: [
          ...state.listSafes,
          newSafe
        ]
      }

    case REMOVE_SAFE:
      const listSafes = state.listSafes.filter(safe => (safe.address !== action.address))
      return {
        currentSafe: action.currentSafe,
        listSafes
      }

    case SELECT_SAFE:
      return {
        ...state,
        currentSafe: action.address
      }

    case UPDATE_SAFE_ALIAS:
      const updatedSafes = state.listSafes.map(safe => {
        if (safe.address === action.address) {
          safe.alias = action.alias
        }
        return safe
      })
      return {
        ...state,
        listSafes: updatedSafes
      }

    default:
      return state
  }
}

export default safes
