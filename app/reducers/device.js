import {
  UPDATE_DEVICE_DATA,
  NOTIFY_DEVICE_UPDATED
} from 'actions/device'

const initalState = {
  versionNumber: undefined,
  buildNumber: undefined,
  lastUpdateNotified: false
}

function device(state = initalState, action) {
  switch (action.type) {
    case UPDATE_DEVICE_DATA:
      return {
        versionNumber: action.versionNumber,
        buildNumber: action.buildNumber,
        lastUpdateNotified: false
      }

    case NOTIFY_DEVICE_UPDATED:
      return {
        ...state,
        lastUpdateNotified: true,
      }

    default:
      return state
  }
}

export default device
