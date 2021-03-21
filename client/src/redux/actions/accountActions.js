import axios from 'axios'
import {
  ACCOUNTS_FAIL,
  ACCOUNTS_REQUEST,
  ACCOUNTS_SUCCESS,
  ACCOUNT_ADD_FAIL,
  ACCOUNT_ADD_REQUEST,
  ACCOUNT_ADD_SUCCESS,
  ACCOUNT_DETAILS_FAIL,
  ACCOUNT_DETAILS_REQUEST,
  ACCOUNT_DETAILS_SUCCESS,
} from '../constants/accountConstants'

export const listAccounts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ACCOUNTS_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-type': 'Application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/accounts`, config)
    dispatch({ type: ACCOUNTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ACCOUNTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addAccount = (account) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACCOUNT_ADD_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-type': 'Application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.post(`/api/accounts`, account, config)
    dispatch({ type: ACCOUNT_ADD_SUCCESS })
  } catch (error) {
    dispatch({
      type: ACCOUNT_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getAccountDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ACCOUNT_DETAILS_REQUEST })

    const config = {
      headers: {
        'Content-type': 'Application/json',
      },
    }
    const { data } = await axios.get(`/api/accounts/${id}`, config)
    dispatch({ type: ACCOUNT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ACCOUNT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
