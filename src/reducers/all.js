
import C from '../constants'
import { combineReducers } from 'redux'

export function auth(state = null, action) {
  switch (action.type) {
    case C.LOGIN_USER:
      return action.user;
    case C.LOGOUT_USER:
      return null;
    default:
      return state;
  }
}

export const loader = (state = true, action) => {
  switch (action.type) {
    case C.FETCH_SUCCESS: 
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  auth,
  loader
});

