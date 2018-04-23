import { CREATE_ACCOUNT } from 'routes/PairingProcess/store/actions'
import { CONFIGURE_LOCKING } from 'routes/LockingConfiguration/store/actions'
import { UNLOCK_ACCOUNT } from 'routes/Account/store/actions'
import { LOCK_ACCOUNT } from 'actions/account'

const initalState = {
  lockedState: true,
  unlockingTime: undefined,
  autoLockInterval: 5,
  secondFA: {
    unlockedMnemonic: undefined,
  }
}

function account(state = initalState, action) {
  let newState
  switch (action.type) {

    case CREATE_ACCOUNT:
      const secondFA = {
        address: action.address,
        seed: action.seed,
        hmac: action.hmac,
      }
      return {
        ...state,
        lockedState: true,
        secondFA
      }

    case LOCK_ACCOUNT:
      return {
        ...state,
        lockedState: true,
        unlockingTime: undefined,
        secondFA: {
          ...state.secondFA,
          unlockedMnemonic: undefined,
        }
      }

    case UNLOCK_ACCOUNT:
      return {
        ...state,
        lockedState: false,
        unlockingTime: action.unlockingTime,
        secondFA: {
          ...state.secondFA,
          unlockedMnemonic: action.seed
        }
      }

    case CONFIGURE_LOCKING:
      return {
        ...state,
        autoLockInterval: action.autoLockInterval,
      }

    default:
      return state

  }
}

export default account
