
import C from "../constants";
import fetch from "isomorphic-fetch";
import { addError } from "./general";

export function loginUser(user) {
  return { type: C.LOGIN_USER, user };
}

export function logoutUser() {
  return { type: C.LOGOUT_USER };
}

export const addUser = user => {
  return { type: C.ADD_USER, user };
}

export const createUser = user => dispatch => {
  let reqConf = {
    method: C.HTTP.POST,
    body: user /* NO 'JSON.stringify(userData)' because of picture */
  }
  // dispatch(startAdding());
  fetch(C.URLS.USERS, reqConf)
    .then(response => response.json())
    .then(data => {
      // TODO: How about returning 'fetch' object from above and doing this 'then' in the calling context?
      dispatch(addUser(data.user));
      console.log("USER data (Signup)", data);
      // dispatch(finishAdding()); // TODO: should this be here?
    })
    .catch(error => {
      dispatch(addError(error.message));
      // dispatch(finishAdding());
    });
}

