import {
  CURRENCYRATE_ADD_FAIL,
  CURRENCYRATE_ADD_REQUEST,
  CURRENCYRATE_ADD_RESET,
  CURRENCYRATE_ADD_SUCCESS,
  CURRENCYRATE_DELETE_FAIL,
  CURRENCYRATE_DELETE_REQUEST,
  CURRENCYRATE_DELETE_RESET,
  CURRENCYRATE_DELETE_SUCCESS,
  CURRENCYRATE_FINANS_LIST_FAIL,
  CURRENCYRATE_FINANS_LIST_REQUEST,
  CURRENCYRATE_FINANS_LIST_RESET,
  CURRENCYRATE_FINANS_LIST_SUCCESS,
  CURRENCYRATE_LIST_FAIL,
  CURRENCYRATE_LIST_REQUEST,
  CURRENCYRATE_LIST_RESET,
  CURRENCYRATE_LIST_SUCCESS,
} from '../constants/currencyRateConstants'

export const currencyRateAddReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENCYRATE_ADD_REQUEST:
      return { loading: true, success: false }
    case CURRENCYRATE_ADD_SUCCESS:
      return { loading: false, success: true }
    case CURRENCYRATE_ADD_FAIL:
      return { loading: false, error: action.payload }
    case CURRENCYRATE_ADD_RESET:
      return {}
    default:
      return state
  }
}

export const currencyRateGetReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENCYRATE_LIST_REQUEST:
      return { loading: true, success: false }
    case CURRENCYRATE_LIST_SUCCESS:
      return { loading: false, success: true, currencyRate: action.payload }
    case CURRENCYRATE_LIST_FAIL:
      return { loading: false, error: action.payload }
    case CURRENCYRATE_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const currencyRateDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENCYRATE_DELETE_REQUEST:
      return { loading: true, success: false }
    case CURRENCYRATE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case CURRENCYRATE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case CURRENCYRATE_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const currencyRateFinansGetReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENCYRATE_FINANS_LIST_REQUEST:
      return { loading: true, success: false }
    case CURRENCYRATE_FINANS_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        currencyRateFinans: action.payload,
      }
    case CURRENCYRATE_FINANS_LIST_FAIL:
      return { loading: false, error: action.payload }
    case CURRENCYRATE_FINANS_LIST_RESET:
      return {}
    default:
      return state
  }
}
