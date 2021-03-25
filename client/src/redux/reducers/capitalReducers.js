import {
  CAPITAL_FAIL,
  CAPITAL_REQUEST,
  CAPITAL_RESET,
  CAPITAL_SUCCESS,
  CAPITAL_UPDATE_FAIL,
  CAPITAL_UPDATE_REQUEST,
  CAPITAL_UPDATE_RESET,
  CAPITAL_UPDATE_SUCCESS,
} from '../constants/capitalConstants'

export const capitalGetReducer = (state = {}, action) => {
  switch (action.type) {
    case CAPITAL_REQUEST:
      return { loading: true, capital: {} }
    case CAPITAL_SUCCESS:
      return { loading: false, capital: action.payload }
    case CAPITAL_FAIL:
      return { loading: false, error: action.payload }
    case CAPITAL_RESET:
      return {}
    default:
      return state
  }
}

export const capitalUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CAPITAL_UPDATE_REQUEST:
      return { loading: true, success: false }
    case CAPITAL_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case CAPITAL_UPDATE_FAIL:
      return { laoding: false, error: action.payload }
    case CAPITAL_UPDATE_RESET:
      return {}
    default:
      return state
  }
}
