import {
  ACCESS_REQUEST,
  APPROVE_ACCESS_REQUEST,
  REMOVE_ALL_ENABLED_DAPPS,
  REMOVE_ACCESS_REQUEST
} from 'actions/enabledDapps'

const initialState = {
  providerRequest: undefined,
  dapps: []
}

function enabledDapps (state = initialState, action) {
  switch (action.type) {
    case ACCESS_REQUEST:
      const enabledDapps = {
        ...state,
        providerRequest: {
          origin: action.origin,
          title: action.title,
          image: action.image,
          windowId: action.windowId,
          dappWindowId: action.dappWindowId,
          dappTabId: action.dappTabId
        }
      }
      return enabledDapps

    case APPROVE_ACCESS_REQUEST:
      return {
        providerRequest: undefined,
        dapps: [
          ...state.dapps,
          action.origin
        ]
      }

    case REMOVE_ALL_ENABLED_DAPPS:
      return initialState

    case REMOVE_ACCESS_REQUEST:
      return {
        ...state,
        providerRequest: undefined
      }

    default:
      return state
  }
}

export default enabledDapps
