import C from "../constants";
import fetch from "isomorphic-fetch";

export function loginUser(user) {
  return { type: C.LOGIN_USER, user }
}
export function logoutUser() {
  return { type: C.LOGOUT_USER }
}

