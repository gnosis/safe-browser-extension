import {
  CREATE_ACCOUNT,
} from '../actions'

function account(state = {}, action) {
  switch (action.type) {

    case CREATE_ACCOUNT:
      return {
        address: action.address,
        seed: action.seed,
      }

    default:
      return state

  }
}

export default account
