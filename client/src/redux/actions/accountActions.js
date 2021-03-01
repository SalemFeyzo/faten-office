import axios from 'axios'
import {
  ACCOUNTS_FAIL,
  ACCOUNTS_REQUEST,
  ACCOUNTS_SUCCESS,
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
    const { data } = await axios.get(`/api/case`, config)
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
