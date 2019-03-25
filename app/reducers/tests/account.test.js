import rootReducer from 'reducers'
import { createStore } from 'redux'
import CryptoJs from 'crypto-js'

import { createAccount } from 'routes/extension/DownloadApps/store/actions'
import { configureLocking } from 'routes/extension/LockingConfiguration/store/actions'
import { unlockAccount } from 'components/Header/LockingState/store/actions'
import { updateMasterPassword } from 'routes/extension/ChangePassword/store/actions'
import { lockAccount } from 'actions/account'
import { createEthAccount } from 'routes/extension/DownloadApps/components/PairingProcess/containers/pairEthAccount'

const address = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'
const mnemonic =
  'myth like bonus scare over problem client lizard pioneer submit female collect'
const seed =
  'U2FsdGVkX1/PzvlOtLnvBa19Yl/wNyn+xeNJ/ZCFaPwFh+svYVUB7LSaocwBtb1tQIXandPp2A2gKj99B0uoWSigdVh4G8J1bEr+Pa6cqgPuN4nNRVhxAw+Sud+x0+8W'
const hmac = '421e3feb800198552c762254830deaadd24a84eff4600897bbe1f9282dc47563'
const password = 'asdfasdf1'
const newPassword = 'qwerty123'

describe('Test account redux reducer', () => {
  test('Create account test', () => {
    // GIVEN
    const stateBefore = {
      account: {
        lockedState: true,
        unlockingTime: undefined,
        autoLockInterval: 5,
        secondFA: {
          address: undefined,
          hmac: undefined,
          seed: undefined,
          unlockedMnemonic: undefined
        }
      }
    }
    const actualStore = createStore(rootReducer, stateBefore)

    // WHEN
    actualStore.dispatch(createAccount(address, seed, hmac))

    // THEN
    const expectedState = {
      lockedState: true,
      unlockingTime: undefined,
      autoLockInterval: 5,
      secondFA: {
        address,
        hmac,
        seed,
        unlockedMnemonic: undefined
      }
    }
    expect(actualStore.getState().account).toEqual(expectedState)
  })

  test('Lock account test', () => {
    // GIVEN
    const stateBefore = {
      account: {
        lockedState: false,
        unlockingTime: '2019-01-17T09:35:47.824Z',
        autoLockInterval: 5,
        secondFA: {
          address,
          hmac,
          seed,
          unlockedMnemonic: mnemonic
        }
      }
    }
    const actualStore = createStore(rootReducer, stateBefore)

    // WHEN
    actualStore.dispatch(lockAccount())

    // THEN
    const expectedState = {
      lockedState: true,
      unlockingTime: undefined,
      autoLockInterval: 5,
      secondFA: {
        address,
        hmac,
        seed,
        unlockedMnemonic: undefined
      }
    }
    expect(actualStore.getState().account).toEqual(expectedState)
  })

  test('Unlock account test', () => {
    // GIVEN
    const stateBefore = {
      account: {
        lockedState: true,
        unlockingTime: undefined,
        autoLockInterval: 5,
        secondFA: {
          address,
          hmac,
          seed,
          unlockedMnemonic: undefined
        }
      }
    }
    const actualStore = createStore(rootReducer, stateBefore)

    // WHEN
    const unlockingTime = '2019-01-17T09:35:47.824Z'
    const mnemonic = CryptoJs.AES.decrypt(
      actualStore.getState().account.secondFA.seed,
      password
    ).toString(CryptoJs.enc.Utf8)
    actualStore.dispatch(unlockAccount(mnemonic, unlockingTime))

    // THEN
    const expectedState = {
      lockedState: false,
      unlockingTime,
      autoLockInterval: 5,
      secondFA: {
        address,
        hmac,
        seed,
        unlockedMnemonic: mnemonic
      }
    }
    expect(actualStore.getState().account).toEqual(expectedState)
  })

  test('Configure locking with locked account test', () => {
    // GIVEN
    const stateBefore = {
      account: {
        lockedState: true,
        unlockingTime: undefined,
        autoLockInterval: 10,
        secondFA: {
          address,
          hmac,
          seed,
          unlockedMnemonic: undefined
        }
      }
    }
    const actualStore = createStore(rootReducer, stateBefore)

    // WHEN
    const unlockingTime = '2019-01-17T09:35:47.824Z'
    actualStore.dispatch(configureLocking(60, unlockingTime))

    // THEN
    const expectedState = {
      lockedState: true,
      unlockingTime,
      autoLockInterval: 60,
      secondFA: {
        address,
        hmac,
        seed,
        unlockedMnemonic: undefined
      }
    }
    expect(actualStore.getState().account).toEqual(expectedState)
  })

  test('Configure locking with unlocked account test', () => {
    // GIVEN
    const stateBefore = {
      account: {
        lockedState: false,
        unlockingTime: '2019-01-17T09:10:00.824Z',
        autoLockInterval: 10,
        secondFA: {
          address,
          hmac,
          seed,
          unlockedMnemonic: mnemonic
        }
      }
    }
    const actualStore = createStore(rootReducer, stateBefore)

    // WHEN
    actualStore.dispatch(configureLocking(60, '2019-01-17T09:35:47.824Z'))

    // THEN
    const expectedState = {
      lockedState: false,
      unlockingTime: '2019-01-17T09:35:47.824Z',
      autoLockInterval: 60,
      secondFA: {
        address,
        hmac,
        seed,
        unlockedMnemonic: mnemonic
      }
    }
    expect(actualStore.getState().account).toEqual(expectedState)
  })

  test('Update master password test', () => {
    // GIVEN
    const stateBefore = {
      account: {
        lockedState: false,
        unlockingTime: '2019-01-17T09:10:00.824Z',
        autoLockInterval: 5,
        secondFA: {
          address,
          hmac,
          seed,
          unlockedMnemonic: mnemonic
        }
      }
    }
    const actualStore = createStore(rootReducer, stateBefore)

    // WHEN
    const { encryptedMnemonic, newHmac } = createEthAccount(
      mnemonic,
      newPassword
    )
    actualStore.dispatch(updateMasterPassword(encryptedMnemonic, newHmac))

    // THEN
    const expectedState = {
      lockedState: true,
      unlockingTime: undefined,
      autoLockInterval: 5,
      secondFA: {
        address,
        hmac: newHmac,
        seed: encryptedMnemonic,
        unlockedMnemonic: undefined
      }
    }
    expect(actualStore.getState().account).toEqual(expectedState)
  })
})
