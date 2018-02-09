import {
  CREATE_ACCOUNT,
  RESTORE_ACCOUNT,
} from '../actions/account'

function account(state = {}, action) {
  switch (action.type) {

    case CREATE_ACCOUNT:
      return Object.assign({}, state, {
        password: action.password,
        v3: action.v3
      })

    case RESTORE_ACCOUNT:
      return Object.assign({}, state, {
        password: action.password,
        v3: action.v3
      })

    default:
      return state

  }
}

export default account