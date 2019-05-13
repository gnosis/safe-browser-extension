import rootReducer from 'reducers'
import { createStore } from 'redux'
import { notifyDeviceUpdated, updateDeviceData } from 'actions/device'
import { getAppVersionNumber, getAppBuildNumber } from '../../../config'

describe('Test device redux reducer', () => {
  test('Update device data on extension update', () => {
    // GIVEN
    const stateBefore = {
      device: {
        versionNumber: undefined,
        buildNumber: undefined,
        lastUpdateNotified: true
      }
    }
    const currentStore = createStore(rootReducer, stateBefore)

    // WHEN
    const appVersion = getAppVersionNumber()
    const buildNumber = getAppBuildNumber()
    currentStore.dispatch(updateDeviceData(appVersion, buildNumber))

    // THEN
    const expectedState = {
      versionNumber: appVersion,
      buildNumber: buildNumber,
      lastUpdateNotified: false
    }
    expect(currentStore.getState().device).toEqual(expectedState)
  })

  test('Notify device updated', () => {
    // GIVEN
    const appVersion = getAppVersionNumber()
    const buildNumber = getAppBuildNumber()
    const stateBefore = {
      device: {
        versionNumber: appVersion,
        buildNumber: buildNumber,
        lastUpdateNotified: false
      }
    }
    const currentStore = createStore(rootReducer, stateBefore)

    // WHEN
    currentStore.dispatch(notifyDeviceUpdated())

    // THEN
    const expectedState = {
      versionNumber: appVersion,
      buildNumber: buildNumber,
      lastUpdateNotified: true
    }
    expect(currentStore.getState().device).toEqual(expectedState)
  })
})
