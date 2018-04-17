import {
  CREATE_RELAYER_ACCOUNT,
  CREATE_2FA_ACCOUNT,
} from '../actions'

const initalState = {
  secondFA: {}
}
function account(state = initalState, action) {
  let newState

  switch (action.type) {

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
