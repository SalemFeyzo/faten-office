import axios from 'axios'
import {
  CURRENCYRATE_ADD_FAIL,
  CURRENCYRATE_ADD_REQUEST,
  CURRENCYRATE_ADD_SUCCESS,
  CURRENCYRATE_DELETE_FAIL,
  CURRENCYRATE_DELETE_REQUEST,
  CURRENCYRATE_DELETE_SUCCESS,
  CURRENCYRATE_FINANS_LIST_FAIL,
  CURRENCYRATE_FINANS_LIST_REQUEST,
  CURRENCYRATE_FINANS_LIST_SUCCESS,
  CURRENCYRATE_LIST_FAIL,
  CURRENCYRATE_LIST_REQUEST,
  CURRENCYRATE_LIST_SUCCESS,
} from '../constants/currencyRateConstants'

export const addCurrencyRate = (currencyRate) => async (dispatch, getState) => {
  try {
    dispatch({ type: CURRENCYRATE_ADD_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-type': 'Application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(`/api/currencyrate`, currencyRate, config)
    dispatch({ type: CURRENCYRATE_ADD_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CURRENCYRATE_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCurrencyRate = () => async (dispatch) => {
  try {
    dispatch({ type: CURRENCYRATE_LIST_REQUEST })

    const config = {
      headers: {
        'Content-type': 'Application/json',
      },
    }
    const { data } = await axios.get(`/api/currencyrate`, config)
    dispatch({ type: CURRENCYRATE_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CURRENCYRATE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteCurrencyRate = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CURRENCYRATE_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-type': 'Application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.delete(`/api/currencyrate/${id}`, config)
    dispatch({ type: CURRENCYRATE_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CURRENCYRATE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCurrencyRateFinans = () => async (dispatch) => {
  try {
    dispatch({ type: CURRENCYRATE_FINANS_LIST_REQUEST })

    const config = {
      headers: {
        'Content-type': 'Application/json',
      },
    }
    const { data } = await axios.get(
      `https://finans.truncgil.com/v3/today.json`,
      config
    )
    dispatch({ type: CURRENCYRATE_FINANS_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CURRENCYRATE_FINANS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
