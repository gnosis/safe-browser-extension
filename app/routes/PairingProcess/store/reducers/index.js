import {
  CREATE_RELAYER_ACCOUNT,
  CREATE_2FA_ACCOUNT,
} from '../actions'

const initalState = {
  relayer: {},
  secondFA: {}
}
function account(state = initalState, action) {
  let newState

  switch (action.type) {

    case CREATE_RELAYER_ACCOUNT:
      const relayer = {
        address: action.address,
        seed: action.seed,
      }
      return {
        ...state,
        relayer
      }

    case CREATE_2FA_ACCOUNT:
      const secondFA = {
        address: action.address,
        seed: action.seed,
        hmac: action.hmac,
      }
      return {
        ...state,
        secondFA
      }

    default:
      return state

  }
}

export default account
