import { CREATE_ACCOUNT } from 'routes/extension/DownloadApps/store/actions'
import { CONFIGURE_LOCKING } from 'routes/extension/LockingConfiguration/store/actions'
import { UNLOCK_ACCOUNT } from 'components/Headers/CompleteHeader/LockingState/store/actions'
import { LOCK_ACCOUNT, INCREMENT_CURRENT_ACCOUNT_INDEX } from 'actions/account'
import { UPDATE_MASTER_PASSWORD } from 'routes/extension/ChangePassword/store/actions'

const initalState = {
  lockedState: true,
  unlockingTime: undefined,
  autoLockInterval: 5,
  secondFA: {
    unlockedMnemonic: undefined,
    currentAccountIndex: 0
  }
}

function account(state = initalState, action) {
  switch (action.type) {
    case CREATE_ACCOUNT:
      const secondFA = {
        address: action.address,
        seed: action.seed,
        hmac: action.hmac,
        currentAccountIndex: 0
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
          unlockedMnemonic: undefined
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
        unlockingTime: action.unlockingTime
      }

    case UPDATE_MASTER_PASSWORD:
      return {
        ...state,
        lockedState: true,
        unlockingTime: undefined,
        secondFA: {
          ...state.secondFA,
          seed: action.seed,
          hmac: action.hmac,
          unlockedMnemonic: undefined
        }
      }

    case INCREMENT_CURRENT_ACCOUNT_INDEX:
      return {
        ...state,
        secondFA: {
          ...state.secondFA,
          currentAccountIndex: state.secondFA.currentAccountIndex
            ? state.secondFA.currentAccountIndex + 1
            : 1
        }
      }

    default:
      return state
  }
}

export default account
