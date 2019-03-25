import rootReducer from 'reducers'
import { createStore } from 'redux'

import {
  addWhitelistedDapp,
  deleteWhitelistedDapp,
  deleteAllWhitelistedDapps
} from 'actions/whitelistedDapps'

const dapp1 = 'https://slow.trade'
const dapp2 = 'https://myetherwallet.com'

describe('Test whitelisted dapps redux reducer', () => {
  test('Add whitelisted dapp test', () => {
    // GIVEN
    const stateBefore = {
      whitelistedDapps: []
    }
    const actualStore = createStore(rootReducer, stateBefore)

    // WHEN
    const whitelistedDapp = 'http://slow.trade'
    actualStore.dispatch(addWhitelistedDapp(whitelistedDapp))

    // THEN
    const expectedState = [whitelistedDapp]
    expect(actualStore.getState().whitelistedDapps).toEqual(expectedState)
  })

  test('Delete whitelisted dapp test', () => {
    // GIVEN
    const stateBefore = {
      whitelistedDapps: [dapp1, dapp2]
    }
    const actualStore = createStore(rootReducer, stateBefore)

    // WHEN
    actualStore.dispatch(deleteWhitelistedDapp(dapp1))

    // THEN
    let expectedState = [dapp2]
    expect(actualStore.getState().whitelistedDapps).toEqual(expectedState)

    // WHEN
    actualStore.dispatch(deleteWhitelistedDapp(dapp2))

    // THEN
    expectedState = []
    expect(actualStore.getState().whitelistedDapps).toEqual(expectedState)
  })

  test('Delete all whitelisted dapps test', () => {
    // GIVEN
    const stateBefore = {
      whitelistedDapps: [dapp1, dapp2]
    }
    const actualStore = createStore(rootReducer, stateBefore)

    // WHEN
    actualStore.dispatch(deleteAllWhitelistedDapps())

    // THEN
    const expectedState = []
    expect(actualStore.getState().whitelistedDapps).toEqual(expectedState)
  })
})
