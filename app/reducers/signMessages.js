import {
  ADD_SIGN_MESSAGE,
  REMOVE_SIGN_MESSAGE,
  REMOVE_ALL_SIGN_MESSAGES
} from 'actions/signMessages'

const initialState = {
  dappWindowId: undefined,
  dappTabId: undefined,
  windowId: undefined,
  message: []
}

function signMessages(state = initialState, action) {
  switch (action.type) {
    case ADD_SIGN_MESSAGE:
      return {
        dappWindowId: action.dappWindowId,
        dappTabId: action.dappTabId,
        windowId: action.windowId,
        message: action.message
      }

    case REMOVE_SIGN_MESSAGE:
      return {
        ...state,
        message: []
      }

    case REMOVE_ALL_SIGN_MESSAGES:
      return initialState

    default:
      return state
  }
}

export default signMessages
