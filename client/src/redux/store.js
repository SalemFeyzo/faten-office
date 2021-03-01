import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  userDetailsReducer,
  userLoginReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import { accountsListReducer } from './reducers/accountReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  accountsList: accountsListReducer,
})

const PREFIX = 'faten-'
const userInfoFromStorage = localStorage.getItem(`${PREFIX}userInfo`)
  ? JSON.parse(localStorage.getItem(`${PREFIX}userInfo`))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
