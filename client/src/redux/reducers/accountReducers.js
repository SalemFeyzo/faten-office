import {
  ACCOUNTS_FAIL,
  ACCOUNTS_REQUEST,
  ACCOUNTS_RESET,
  ACCOUNTS_SUCCESS,
  ACCOUNT_ADD_FAIL,
  ACCOUNT_ADD_REQUEST,
  ACCOUNT_ADD_RESET,
  ACCOUNT_ADD_SUCCESS,
  ACCOUNT_DETAILS_FAIL,
  ACCOUNT_DETAILS_REQUEST,
  ACCOUNT_DETAILS_RESET,
  ACCOUNT_DETAILS_SUCCESS,
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

export const accountAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCOUNT_ADD_REQUEST:
      return { loading: true, success: false }
    case ACCOUNT_ADD_SUCCESS:
      return { loading: false, success: true }
    case ACCOUNT_ADD_FAIL:
      return { loading: false, error: action.payload }
    case ACCOUNT_ADD_RESET:
      return {}
    default:
      return state
  }
}

export const accountDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCOUNT_DETAILS_REQUEST:
      return { loading: true }
    case ACCOUNT_DETAILS_SUCCESS:
      return { loading: false, account: action.payload }
    case ACCOUNT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case ACCOUNT_DETAILS_RESET:
      return {}
    default:
      return state
  }
}
