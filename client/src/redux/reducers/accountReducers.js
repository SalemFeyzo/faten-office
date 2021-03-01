import {
  ACCOUNTS_FAIL,
  ACCOUNTS_REQUEST,
  ACCOUNTS_RESET,
  ACCOUNTS_SUCCESS,
} from '../constants/accountConstants'

export const accountsListReducer = (state = { accounts: [] }, action) => {
  switch (action.type) {
    case ACCOUNTS_REQUEST:
      return { loading: true }
    case ACCOUNTS_SUCCESS:
      return { loading: false, accounts: action.payload }
    case ACCOUNTS_FAIL:
      return { loading: false, error: action.payload }
    case ACCOUNTS_RESET:
      return { accounts: [] }
    default:
      return state
  }
}
