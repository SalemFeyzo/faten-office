import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import {
  accountAddReducer,
  accountDetailsReducer,
  accountsListReducer,
} from './reducers/accountReducers'
import {
  interactionAddIOReducer,
  interactionAddReducer,
  interactionDeleteReducer,
  interactionDetailsReducer,
  interactionListByAccountReducer,
  interactionListByDateReducer,
  interactionListByTypeReducer,
  interactionListByUserReducer,
  interactionListReducer,
  interactionUpdateReducer,
  totalByAccoountReducer,
  totalsReducer,
} from './reducers/interactionReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  accountsList: accountsListReducer,
  accountDetails: accountDetailsReducer,
  accountAdd: accountAddReducer,
  interactionAdd: interactionAddReducer,
  interactionUpdate: interactionUpdateReducer,
  interactionDetails: interactionDetailsReducer,
  interactionDelete: interactionDeleteReducer,
  interactionList: interactionListReducer,
  interactionListByAccount: interactionListByAccountReducer,
  interactionListByDate: interactionListByDateReducer,
  interactionListByUser: interactionListByUserReducer,
  interactionListByType: interactionListByTypeReducer,
  interactionAddIO: interactionAddIOReducer,
  totalByAccount: totalByAccoountReducer,
  totals: totalsReducer,
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
