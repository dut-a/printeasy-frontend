
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

export const errors = (state = [], action) => {
  switch(action.type) {
    case C.ADD_ERROR:
    	return [
        ...state,
        action.message
    	];
    case C.CLEAR_ERROR: 
      return state.filter((message, i) => i !== action.errorId);
  	default: 
  		return state;
  }
}

export const fetching = (state = false, action) => {
  switch(action.type) {
    case C.ACTIONS.FETCHING:
      return true
    case C.ACTIONS.FINISH_FETCHING:
      return false
    default:
      return state
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
            service_type: action.service.service_type,
            cost: action.service.cost,
            time_to_complete: action.service.time_to_complete,
            user: action.service.user,
            prints: action.service.prints
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

export const users = function(state = { users: [] }, action) {
  switch (action.type) {
    case C.ADD_USERS:
      return {
        users: [...action.users]
      };
    case C.ADD_USER:
      return {
        users: state.users.concat(action.user)
      };
    case C.EDIT_USER:
      const newUsers = state.users.map(user => {
        if (user.id === action.user.id) {
          return {
            ...user,
            username: action.user.username,
            user_type: action.user.user_type,
            bio: action.user.bio,
            picture: action.user.picture,
            phone_number: action.user.phone_number,
            email_address: action.user.email_address,
            physical_address: action.user.physical_address,
            first_name: action.user.first_name,
            middle_name: action.user.middle_name,
            last_name: action.user.last_name
          }
        } else {
          return user
        }
      });
      console.log("edit: ", { users: newUsers });
      return {
        users: newUsers
      };
    case C.DELETE_USER:
      console.log("DELETE, user Id: ", action.userId);
      return state.users.filter(user => user.id !== action.userId);
    default:
      return state;
  }
}

export const prints = function(state = { prints: [] }, action) {
  switch (action.type) {
    case C.ADD_PRINTS:
      return {
        prints: [...action.prints]
      };
    case C.ADD_PRINT:
      return {
        prints: state.prints.concat(action.print)
      };
    case C.EDIT_PRINT:
      const newPrints = state.prints.map(print => {
        if (print.id === action.print.id) {
          return {
            ...print,
            print_type: action.print.print_type,
            number_of_copies: action.print.number_of_copies,
            ordered_by: action.print.ordered_by,
            fulfilled_by: action.print.fulfilled_by,
            payment_method: action.print.payment_method,
            payment_status: action.print.payment_status,
            pickup_location: action.print.pickup_location,
            pickup_type: action.print.pickup_type,
            delivery_address: action.print.delivery_address,
            placed_on: action.print.placed_on,
            estimated_completion_time: action.print.estimated_completion_time,
            status: action.print.status,
            user: action.print.user,
            service: action.print.service
          }
        } else {
          return print
        }
      });
      console.log("edit: ", { prints: newPrints });
      return {
        prints: newPrints
      };
    case C.DELETE_PRINT:
      console.log("DELETE, print Id: ", action.printId);
      return state.prints.filter(print => print.id !== action.printId);
    default:
      return state;
  }
}

export default combineReducers({
  auth,
  loader,
  services,
  users,
  prints,
  errors,
  fetching
});

