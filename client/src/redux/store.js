import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer } from './reducers/userReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
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
