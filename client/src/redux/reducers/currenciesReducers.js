import {
  CURRENCIES_GET_FAIL,
  CURRENCIES_GET_REQUEST,
  CURRENCIES_GET_RESET,
  CURRENCIES_GET_SUCCESS,
  CURRENCIES_UPDATE_FAIL,
  CURRENCIES_UPDATE_REQUEST,
  CURRENCIES_UPDATE_RESET,
  CURRENCIES_UPDATE_SUCCESS,
} from '../constants/currenciesConstants'

export const currenciesGetReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENCIES_GET_REQUEST:
      return { loading: true, currencies: {} }
    case CURRENCIES_GET_SUCCESS:
      return { loading: false, currencies: action.payload }
    case CURRENCIES_GET_FAIL:
      return { loading: false, error: action.payload }
    case CURRENCIES_GET_RESET:
      return {}
    default:
      return state
  }
}

export const currenciesUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENCIES_UPDATE_REQUEST:
      return { loading: true, success: false }
    case CURRENCIES_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case CURRENCIES_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case CURRENCIES_GET_RESET:
      return {}
    default:
      return state
  }
}
