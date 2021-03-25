import axios from 'axios'
import {
  CAPITAL_FAIL,
  CAPITAL_REQUEST,
  CAPITAL_SUCCESS,
  CAPITAL_UPDATE_FAIL,
  CAPITAL_UPDATE_REQUEST,
  CAPITAL_UPDATE_SUCCESS,
} from '../constants/capitalConstants'

export const getCapital = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CAPITAL_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-type': 'Application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get('/api/capital', config)
    dispatch({ type: CAPITAL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CAPITAL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateCapital = (id, capital) => async (dispatch, getState) => {
  try {
    dispatch({ type: CAPITAL_UPDATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-type': 'Application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`/api/capital/${id}`, capital, config)
    dispatch({ type: CAPITAL_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CAPITAL_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
