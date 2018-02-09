import {
  CREATE_ACCOUNT,
  REQUEST_RESTORE_ACCOUNT,
  RESTORE_ACCOUNT,
} from '../actions/account'

function account(state = {}, action) {
  switch (action.type) {

    case CREATE_ACCOUNT:
      return {
        address: action.address,
        seed: action.seed,
      }

    case REQUEST_RESTORE_ACCOUNT:
      return {
        password: action.password,
      }

    case RESTORE_ACCOUNT: {
      return {
        address: action.address,
        seed: action.seed,
      }
    }

    default:
      return state

  }
}

export default account