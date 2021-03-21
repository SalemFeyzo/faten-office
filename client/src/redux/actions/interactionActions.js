import axios from 'axios'
import {
  INTERACTION_ADD_FAIL,
  INTERACTION_ADD_IO_FAIL,
  INTERACTION_ADD_IO_REQUEST,
  INTERACTION_ADD_IO_SUCCESS,
  INTERACTION_ADD_REQUEST,
  INTERACTION_ADD_SUCCESS,
  INTERACTION_DELETE_FAIL,
  INTERACTION_DELETE_REQUEST,
  INTERACTION_DELETE_SUCCESS,
  INTERACTION_DETAILS_FAIL,
  INTERACTION_DETAILS_REQUEST,
  INTERACTION_DETAILS_SUCCESS,
  INTERACTION_LIST_BY_ACCOUNT_FAIL,
  INTERACTION_LIST_BY_ACCOUNT_REQUEST,
  INTERACTION_LIST_BY_ACCOUNT_SUCCESS,
  INTERACTION_LIST_BY_DATE_FAIL,
  INTERACTION_LIST_BY_DATE_REQUEST,
  INTERACTION_LIST_BY_DATE_SUCCESS,
  INTERACTION_LIST_BY_TYPE_FAIL,
  INTERACTION_LIST_BY_TYPE_REQUEST,
  INTERACTION_LIST_BY_TYPE_SUCCESS,
  INTERACTION_LIST_BY_USER_FAIL,
  INTERACTION_LIST_BY_USER_REQUEST,
  INTERACTION_LIST_BY_USER_SUCCESS,
  INTERACTION_LIST_FAIL,
  INTERACTION_LIST_REQUEST,
  INTERACTION_LIST_SUCCESS,
  INTERACTION_UPDATE_FAIL,
  INTERACTION_UPDATE_REQUEST,
  INTERACTION_UPDATE_SUCCESS,
  TOTAL_BY_ACCOUNT_FAIL,
  TOTAL_BY_ACCOUNT_REQUEST,
  TOTAL_BY_ACCOUNT_SUCCESS,
  TOTAL_FAIL,
  TOTAL_REQUEST,
  TOTAL_SUCCESS,
} from '../constants/interactionConstants'

export const addInteraction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: INTERACTION_ADD_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-type': 'Application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(`/api/interactions`, {}, config)
    dispatch({ type: INTERACTION_ADD_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INTERACTION_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const getInteractionDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: INTERACTION_DETAILS_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-type': 'Application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/interactions/${id}`, config)
    dispatch({ type: INTERACTION_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INTERACTION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateInteraction = (id, interaction) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: INTERACTION_UPDATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-type': 'Application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(
      `/api/interactions/${id}`,
      interaction,
      config
    )
    dispatch({ type: INTERACTION_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INTERACTION_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteInteraction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: INTERACTION_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-type': 'Application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`/api/interactions/${id}`, config)
    dispatch({ type: INTERACTION_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: INTERACTION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listInteractions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: INTERACTION_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-type': 'Application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/interactions`, config)
    dispatch({ type: INTERACTION_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INTERACTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addInteractionIO = (id, io) => async (dispatch, getState) => {
  try {
    dispatch({ type: INTERACTION_ADD_IO_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-type': 'Application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(`/api/interactions/${id}/io`, io, config)
    dispatch({ type: INTERACTION_ADD_IO_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INTERACTION_ADD_IO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

/// Filters

export const listInteractionsByAccount = (accountId) => async (dispatch) => {
  try {
    dispatch({ type: INTERACTION_LIST_BY_ACCOUNT_REQUEST })

    const config = {
      headers: {
        'Content-type': 'Application/json',
      },
    }
    const { data } = await axios.get(
      `/api/interactions/account/${accountId}`,
      config
    )
    dispatch({ type: INTERACTION_LIST_BY_ACCOUNT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INTERACTION_LIST_BY_ACCOUNT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listInteractionsByDate = (startDate, endDate) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: INTERACTION_LIST_BY_DATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-type': 'Application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `/api/interactions/date/${startDate}/${endDate}`,
      config
    )
    dispatch({ type: INTERACTION_LIST_BY_DATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INTERACTION_LIST_BY_DATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listInteractionsByUser = (userId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: INTERACTION_LIST_BY_USER_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-type': 'Application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/interactions/user/${userId}`, config)
    dispatch({ type: INTERACTION_LIST_BY_USER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INTERACTION_LIST_BY_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listInteractionsByType = (interactionType) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: INTERACTION_LIST_BY_TYPE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-type': 'Application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `/api/interactions/type/${interactionType}`,
      config
    )
    dispatch({ type: INTERACTION_LIST_BY_TYPE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INTERACTION_LIST_BY_TYPE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getTotalByAccount = (id) => async (dispatch) => {
  try {
    dispatch({ type: TOTAL_BY_ACCOUNT_REQUEST })

    const config = {
      headers: {
        'Content-type': 'Application/json',
      },
    }
    const { data } = await axios.get(
      `/api/interactions/account/${id}/io`,
      config
    )
    dispatch({ type: TOTAL_BY_ACCOUNT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TOTAL_BY_ACCOUNT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getTotals = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TOTAL_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-type': 'Application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/interactions/accounts/total`, config)
    dispatch({ type: TOTAL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TOTAL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
