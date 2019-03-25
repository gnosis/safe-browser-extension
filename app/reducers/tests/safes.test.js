import rootReducer from 'reducers'
import { createStore } from 'redux'

import { addSafe } from 'actions/safes'
import {
  removeSafe,
  selectSafe,
  updateSafeAlias
} from 'components/Header/SafesMenu/store/actions'

const safe1 = {
  address: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
  alias: 'Safe'
}
const safe2 = {
  address: '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0',
  alias: 'Safe 09f0'
}

describe('Test Safes redux reducer', () => {
  test('Add first Safe test', () => {
    // GIVEN
    const stateBefore = {
      safes: {
        currentSafe: undefined,
        safes: []
      }
    }
    const actualStore = createStore(rootReducer, stateBefore)

    // WHEN
    actualStore.dispatch(addSafe(safe1.address))

    // THEN
    const expectedState = {
      currentSafe: safe1.address,
      safes: [safe1]
    }
    expect(actualStore.getState().safes).toEqual(expectedState)
  })

  test('Add extra Safe test', () => {
    // GIVEN
    const stateBefore = {
      safes: {
        currentSafe: safe1.address,
        safes: [safe1]
      }
    }
    const actualStore = createStore(rootReducer, stateBefore)

    // WHEN
    actualStore.dispatch(addSafe(safe2.address))

    // THEN
    const expectedState = {
      currentSafe: safe2.address,
      safes: [safe1, safe2]
    }
    expect(actualStore.getState().safes).toEqual(expectedState)
  })

  test('Remove a Safe test', () => {
    // GIVEN
    const stateBefore = {
      safes: {
        currentSafe: safe2.address,
        safes: [safe1, safe2]
      }
    }
    const actualStore = createStore(rootReducer, stateBefore)

    // WHEN
    const deleteSafe = safe2.address
    const currentSafe = safe1.address
    actualStore.dispatch(removeSafe(deleteSafe, currentSafe))

    // THEN
    const expectedState = {
      currentSafe: safe1.address,
      safes: [safe1]
    }
    expect(actualStore.getState().safes).toEqual(expectedState)
  })

  test('Remove last Safe test', () => {
    // GIVEN
    const stateBefore = {
      safes: {
        currentSafe: safe1.address,
        safes: [safe1]
      }
    }
    const actualStore = createStore(rootReducer, stateBefore)

    // WHEN
    const deleteSafe = safe1.address
    const currentSafe = undefined
    actualStore.dispatch(removeSafe(deleteSafe, currentSafe))

    // THEN
    const expectedState = {
      currentSafe: undefined,
      safes: []
    }
    expect(actualStore.getState().safes).toEqual(expectedState)
  })

  test('Select Safe test', () => {
    // GIVEN
    const stateBefore = {
      safes: {
        currentSafe: safe1.address,
        safes: [safe1, safe2]
      }
    }
    const actualStore = createStore(rootReducer, stateBefore)

    // WHEN
    actualStore.dispatch(selectSafe(safe2.address))

    // THEN
    const expectedState = {
      currentSafe: safe2.address,
      safes: [safe1, safe2]
    }
    expect(actualStore.getState().safes).toEqual(expectedState)
  })

  test('Update Safe alias test', () => {
    // GIVEN
    const stateBefore = {
      safes: {
        currentSafe: safe1.address,
        safes: [safe1]
      }
    }
    const actualStore = createStore(rootReducer, stateBefore)

    // WHEN
    const newAlias = 'My fav Safe'
    actualStore.dispatch(updateSafeAlias(safe1.address, newAlias))

    // THEN
    const expectedState = {
      currentSafe: safe1.address,
      safes: [
        {
          address: safe1.address,
          alias: newAlias
        }
      ]
    }
    expect(actualStore.getState().safes).toEqual(expectedState)
  })
})
