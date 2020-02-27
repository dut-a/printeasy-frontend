import { combineReducers } from 'redux'
import loader from './loader'
import auth from './auth'

export default combineReducers({
  auth,
  loader
})

