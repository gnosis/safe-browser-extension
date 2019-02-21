export const ADD_SIGN_MESSAGE = 'ADD_SIGN_MESSAGE'

export const addSignMessage = (message, windowId, dappWindowId, dappTabId) => ({
  type: ADD_SIGN_MESSAGE,
  message,
  windowId,
  dappWindowId,
  dappTabId
})
