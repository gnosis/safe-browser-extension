import {
  ADD_SIGN_MESSAGE,
  REMOVE_SIGN_MESSAGE
} from 'actions/signMessages'

const initialState = {}

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
      return initialState

    default:
      return state
  }
}

export default signMessages
