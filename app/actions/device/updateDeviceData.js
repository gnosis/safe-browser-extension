export const UPDATE_DEVICE_DATA = 'UPDATE_DEVICE_DATA'

export const updateDeviceData = (versionNumber, buildNumber) => ({
  type: UPDATE_DEVICE_DATA,
  versionNumber,
  buildNumber
})
