
import React from "react";
import C from "../constants";

export function login(user) {
  
}

const getUserData = () => JSON.parse(localStorage.user);
const getAuthToken = () => getUserData().auth_token;
const getCurrentUserId = () => getUserData().user_id;
const getCurrentUserType = () => getUserData().user_type;

const getRequestConfig = (httpMethod = C.HTTP.GET) => {
  return {
      method: httpMethod,
      headers: {
        ...C.HTTP.HEADERS,
        "Authorization": `Bearer ${getAuthToken()}`
      }
    };
}

const loggedIn = () => getAuthToken() !== null;
const noData = () => <p>No data available yet...</p>;

export {
  getAuthToken,
  getRequestConfig,
  loggedIn,
  getCurrentUserId,
  getCurrentUserType,
  noData
}

