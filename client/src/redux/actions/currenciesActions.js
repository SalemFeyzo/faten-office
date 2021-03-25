import axios from 'axios'
import {
  CURRENCIES_GET_FAIL,
  CURRENCIES_GET_REQUEST,
  CURRENCIES_GET_SUCCESS,
  CURRENCIES_UPDATE_FAIL,
  CURRENCIES_UPDATE_REQUEST,
  CURRENCIES_UPDATE_SUCCESS,
} from '../constants/currenciesConstants'

export const getCurrencies = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CURRENCIES_GET_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-type': 'Application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get('/api/currencies', config)
    dispatch({
      type: CURRENCIES_GET_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CURRENCIES_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateCurrencies = (id, currencies) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: CURRENCIES_UPDATE_REQUEST })
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
      `/api/currencies/${id}`,
      currencies,
      config
    )
    dispatch({ type: CURRENCIES_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CURRENCIES_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
