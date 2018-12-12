export const ACCESS_REQUEST = 'ACCESS_REQUEST'

export const accessRequest = (origin, title, image, windowId, dappWindowId, dappTabId) => ({
  type: ACCESS_REQUEST,
  origin,
  title,
  image,
  windowId,
  dappWindowId,
  dappTabId
})
