import {
  INTERACTION_ADD_FAIL,
  INTERACTION_ADD_IO_FAIL,
  INTERACTION_ADD_IO_REQUEST,
  INTERACTION_ADD_IO_RESET,
  INTERACTION_ADD_IO_SUCCESS,
  INTERACTION_ADD_REQUEST,
  INTERACTION_ADD_RESET,
  INTERACTION_ADD_SUCCESS,
  INTERACTION_DELETE_FAIL,
  INTERACTION_DELETE_REQUEST,
  INTERACTION_DELETE_RESET,
  INTERACTION_DELETE_SUCCESS,
  INTERACTION_DETAILS_FAIL,
  INTERACTION_DETAILS_REQUEST,
  INTERACTION_DETAILS_RESET,
  INTERACTION_DETAILS_SUCCESS,
  INTERACTION_LIST_BY_ACCOUNT_FAIL,
  INTERACTION_LIST_BY_ACCOUNT_REQUEST,
  INTERACTION_LIST_BY_ACCOUNT_RESET,
  INTERACTION_LIST_BY_ACCOUNT_SUCCESS,
  INTERACTION_LIST_BY_DATE_FAIL,
  INTERACTION_LIST_BY_DATE_REQUEST,
  INTERACTION_LIST_BY_DATE_RESET,
  INTERACTION_LIST_BY_DATE_SUCCESS,
  INTERACTION_LIST_BY_TYPE_REQUEST,
  INTERACTION_LIST_BY_USER_FAIL,
  INTERACTION_LIST_BY_USER_REQUEST,
  INTERACTION_LIST_BY_USER_RESET,
  INTERACTION_LIST_BY_USER_SUCCESS,
  INTERACTION_LIST_FAIL,
  INTERACTION_LIST_REQUEST,
  INTERACTION_LIST_RESET,
  INTERACTION_LIST_SUCCESS,
  INTERACTION_UPDATE_FAIL,
  INTERACTION_UPDATE_REQUEST,
  INTERACTION_UPDATE_RESET,
  INTERACTION_UPDATE_SUCCESS,
  INTERACTION_LIST_BY_TYPE_SUCCESS,
  INTERACTION_LIST_BY_TYPE_FAIL,
  INTERACTION_LIST_BY_TYPE_RESET,
  TOTAL_BY_ACCOUNT_REQUEST,
  TOTAL_BY_ACCOUNT_SUCCESS,
  TOTAL_BY_ACCOUNT_FAIL,
  TOTAL_BY_ACCOUNT_RESET,
  TOTAL_REQUEST,
  TOTAL_SUCCESS,
  TOTAL_FAIL,
  TOTAL_RESET,
  TOTAL_PRIMARY_REQUEST,
  TOTAL_PRIMARY_SUCCESS,
  TOTAL_PRIMARY_FAIL,
  TOTAL_PRIMARY_RESET,
} from '../constants/interactionConstants'

export const interactionAddReducer = (state = { interaction: {} }, action) => {
  switch (action.type) {
    case INTERACTION_ADD_REQUEST:
      return { laoding: true, success: false }
    case INTERACTION_ADD_SUCCESS:
      return { loading: false, success: true, interaction: action.payload }
    case INTERACTION_ADD_FAIL:
      return { laoding: false, error: action.payload }
    case INTERACTION_ADD_RESET:
      return {}
    default:
      return state
  }
}

export const interactionListReducer = (state = {}, action) => {
  switch (action.type) {
    case INTERACTION_LIST_REQUEST:
      return { loading: true }
    case INTERACTION_LIST_SUCCESS:
      return {
        loading: false,
        interactions: action.payload.interactions,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case INTERACTION_LIST_FAIL:
      return { laoding: false, error: action.payload }
    case INTERACTION_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const interactionAddIOReducer = (state = {}, action) => {
  switch (action.type) {
    case INTERACTION_ADD_IO_REQUEST:
      return { loading: true }
    case INTERACTION_ADD_IO_SUCCESS:
      return { loading: false, success: true, interaction: action.payload }
    case INTERACTION_ADD_IO_FAIL:
      return { laoding: false, error: action.payload }
    case INTERACTION_ADD_IO_RESET:
      return {}
    default:
      return state
  }
}

export const interactionUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case INTERACTION_UPDATE_REQUEST:
      return { loading: true }
    case INTERACTION_UPDATE_SUCCESS:
      return { loading: false, success: true }

    case INTERACTION_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case INTERACTION_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const interactionDetailsReducer = (
  state = { interaction: {} },
  action
) => {
  switch (action.type) {
    case INTERACTION_DETAILS_REQUEST:
      return { loading: true, success: false }
    case INTERACTION_DETAILS_SUCCESS:
      return { loading: false, success: true, interaction: action.payload }
    case INTERACTION_DETAILS_FAIL:
      return { laoding: false, error: action.payload }
    case INTERACTION_DETAILS_RESET:
      return { interaction: {} }
    default:
      return state
  }
}

export const interactionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case INTERACTION_DELETE_REQUEST:
      return { loading: true, success: false }
    case INTERACTION_DELETE_SUCCESS:
      return { loading: false, success: true, interaction: action.payload }
    case INTERACTION_DELETE_FAIL:
      return { laoding: false, error: action.payload }
    case INTERACTION_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const interactionListByAccountReducer = (state = {}, action) => {
  switch (action.type) {
    case INTERACTION_LIST_BY_ACCOUNT_REQUEST:
      return { loading: true }
    case INTERACTION_LIST_BY_ACCOUNT_SUCCESS:
      return { loading: false, interactions: action.payload }
    case INTERACTION_LIST_BY_ACCOUNT_FAIL:
      return { laoding: false, error: action.payload }
    case INTERACTION_LIST_BY_ACCOUNT_RESET:
      return {}
    default:
      return state
  }
}

export const interactionListByDateReducer = (state = {}, action) => {
  switch (action.type) {
    case INTERACTION_LIST_BY_DATE_REQUEST:
      return { loading: true }
    case INTERACTION_LIST_BY_DATE_SUCCESS:
      return { loading: false, interactions: action.payload }
    case INTERACTION_LIST_BY_DATE_FAIL:
      return { laoding: false, error: action.payload }
    case INTERACTION_LIST_BY_DATE_RESET:
      return {}
    default:
      return state
  }
}

export const interactionListByUserReducer = (state = {}, action) => {
  switch (action.type) {
    case INTERACTION_LIST_BY_USER_REQUEST:
      return { loading: true }
    case INTERACTION_LIST_BY_USER_SUCCESS:
      return { loading: false, interactions: action.payload }
    case INTERACTION_LIST_BY_USER_FAIL:
      return { laoding: false, error: action.payload }
    case INTERACTION_LIST_BY_USER_RESET:
      return {}
    default:
      return state
  }
}

export const interactionListByTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case INTERACTION_LIST_BY_TYPE_REQUEST:
      return { loading: true }
    case INTERACTION_LIST_BY_TYPE_SUCCESS:
      return { loading: false, interactions: action.payload }
    case INTERACTION_LIST_BY_TYPE_FAIL:
      return { laoding: false, error: action.payload }
    case INTERACTION_LIST_BY_TYPE_RESET:
      return {}
    default:
      return state
  }
}

export const totalByAccoountReducer = (state = {}, action) => {
  switch (action.type) {
    case TOTAL_BY_ACCOUNT_REQUEST:
      return { loading: true }
    case TOTAL_BY_ACCOUNT_SUCCESS:
      return { loading: false, total: action.payload }
    case TOTAL_BY_ACCOUNT_FAIL:
      return { laoding: false, error: action.payload }
    case TOTAL_BY_ACCOUNT_RESET:
      return {}
    default:
      return state
  }
}

export const totalsReducer = (state = {}, action) => {
  switch (action.type) {
    case TOTAL_REQUEST:
      return { loading: true }
    case TOTAL_SUCCESS:
      return { loading: false, total: action.payload }
    case TOTAL_FAIL:
      return { laoding: false, error: action.payload }
    case TOTAL_RESET:
      return {}
    default:
      return state
  }
}

export const totalPrimaryReducer = (state = {}, action) => {
  switch (action.type) {
    case TOTAL_PRIMARY_REQUEST:
      return { loading: true }
    case TOTAL_PRIMARY_SUCCESS:
      return { loading: false, total: action.payload }
    case TOTAL_PRIMARY_FAIL:
      return { laoding: false, error: action.payload }
    case TOTAL_PRIMARY_RESET:
      return {}
    default:
      return state
  }
}
