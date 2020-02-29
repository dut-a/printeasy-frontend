
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
    case C.ACTIONS.FETCH_SUCCESS:
      return false;
    default:
      return state;
  }
}

export const services = function(state = { services: [] }, action) {
  switch (action.type) {
    case C.ADD_SERVICES:
      return {
        services: [...action.services]
      };
    case C.ADD_SERVICE:
      return {
        services: state.services.concat(action.service)
      };
    case C.EDIT_SERVICE:
      const newServices = state.services.map(service => {
        if (service.id === action.service.id) {
          return {
            ...service,
            title: action.service.title,
            details: action.service.details,
            tags: action.service.tags
          }
        } else {
          return service
        }
      });
      console.log("edit: ", { services: newServices });
      return {
        services: newServices
      };
    case C.DELETE_SERVICE:
      console.log("DELETE, service Id: ", action.serviceId);
      return state.services.filter(service => service.id !== action.serviceId);
    default:
      return state;
  }
}

export default combineReducers({
  auth,
  loader,
  services
});

