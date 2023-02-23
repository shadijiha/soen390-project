import { combineReducers } from 'redux'
import UserReducer from './UserReducer'

const reducers = combineReducers({
  auth: UserReducer,
})

export default reducers
