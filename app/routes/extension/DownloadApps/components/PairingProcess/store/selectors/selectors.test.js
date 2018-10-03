import { createStore } from 'redux'
import rootReducer from 'reducers'
import {
  accountSelector,
  safesSelector,
  hasAccountSelector,
  hasLockedAccountSelector,
  selectEncryptedMnemonicSelector,
  selectUnencryptedMnemonicSelector
} from './index'

const address = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'
const mnemonic = 'myth like bonus scare over problem client lizard pioneer submit female collect'
const seed = 'U2FsdGVkX1/PzvlOtLnvBa19Yl/wNyn+xeNJ/ZCFaPwFh+svYVUB7LSaocwBtb1tQIXandPp2A2gKj99B0uoWSigdVh4G8J1bEr+Pa6cqgPuN4nNRVhxAw+Sud+x0+8W'
const hmac = '421e3feb800198552c762254830deaadd24a84eff4600897bbe1f9282dc47563'

const unlockedAccountState = {
  account: {
    lockedState: false,
    unlockingTime: new Date(),
    secondFA: {
      address,
      seed,
      hmac,
      unlockedMnemonic: mnemonic
    }
  }
}

const lockedAccountState = {
  account: {
    lockedState: true,
    secondFA: {
      address,
      seed,
      hmac
    }
  }
}

describe('Pairing process selectors', () => {
  test('accountSelector should return the account', () => {
    const state = lockedAccountState
    const store = createStore(rootReducer, state)

    const result = accountSelector(store.getState())
    expect(result).toEqual(state.account)
  })

  test('safesSelector should return the safes', () => {
    const state = {
      safes: [
        '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1',
        '0xffcf8fdee72ac11b5c542428b35eef5769c409f0'
      ]
    }
    const store = createStore(rootReducer, state)

    const result = safesSelector(store.getState())
    expect(result).toEqual(state.safes)
  })

  test('hasAccountSelector should return false if there is no account', () => {
    const state = { account: {} }
    const store = createStore(rootReducer, state)

    const result = hasAccountSelector(store.getState())
    expect(result).toEqual(false)
  })

  test('hasAccountSelector should return false if there is an empty account', () => {
    const state = { account: { second2F: {} } }
    const store = createStore(rootReducer, state)

    const result = hasAccountSelector(store.getState())
    expect(result).toEqual(false)
  })

  test('hasAccountSelector should return true if there is an account', () => {
    const state = lockedAccountState
    const store = createStore(rootReducer, state)

    const result = hasAccountSelector(store.getState())
    expect(result).toEqual(true)
  })

  test('hasLockedAccountSelector should return true if account is locked', () => {
    const state = lockedAccountState
    const store = createStore(rootReducer, state)

    const result = hasLockedAccountSelector(store.getState())
    expect(result).toEqual(true)
  })

  test('hasLockedAccountSelector should return false if there is no account', () => {
    const state = { account: {} }
    const store = createStore(rootReducer, state)

    const result = hasLockedAccountSelector(store.getState())
    expect(result).toEqual(false)
  })

  test('hasLockedAccountSelector should return false if account is unlocked', () => {
    const state = unlockedAccountState
    const store = createStore(rootReducer, state)

    const result = hasLockedAccountSelector(store.getState())
    expect(result).toEqual(false)
  })

  test('selectEncryptedMnemonicSelector should return the encrypted mnemonic', () => {
    const state = lockedAccountState
    const store = createStore(rootReducer, state)

    const result = selectEncryptedMnemonicSelector(store.getState())
    expect(result).toEqual(seed)
  })

  test('selectUnencryptedMnemonicSelector should return the unencrypted mnemonic', () => {
    const state = unlockedAccountState
    const store = createStore(rootReducer, state)

    const result = selectUnencryptedMnemonicSelector(store.getState())
    expect(result).toEqual(mnemonic)
  })
})
