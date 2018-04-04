import {
  CREATE_RELAYER_ACCOUNT,
  CREATE_2FA_ACCOUNT,
} from '../actions'

function account(state = {}, action) {
  let newState

  switch (action.type) {

    case CREATE_RELAYER_ACCOUNT:
      return {
        ...state,
        relayer: {
          address: action.address,
          seed: action.seed,
        }
      }

      case CREATE_2FA_ACCOUNT:
      return {
        ...state,
        secondFA: {
          address: action.address,
          seed: action.seed,
          hmac: action.hmac,
        }
      }

    default:
      return state

  }
}

export default account
