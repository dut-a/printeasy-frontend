
import React from "react";
import C from "../constants";

export function login(user) {
  
}

const getUserData = () => JSON.parse(localStorage.user);
const getAuthToken = () => getUserData().auth_token;
const getCurrentUserId = () => getUserData().user_id;
const getCurrentUserType = () => getUserData().user_type;
const getCurrentUserAddress = () => getUserData().addr;

const getServiceOfferings = (services, comparator) => {
  return services.filter(service => 
    service.service_type === comparator);
}

const getRequestConfig = (httpMethod = C.HTTP.GET) => {
  return {
      method: httpMethod,
      headers: {
        ...C.HTTP.HEADERS,
        "Authorization": `Bearer ${getAuthToken()}`
      }
    };
}

const formatDate = date => {
  // let options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  let options = { year: "numeric", month: "long", day: "numeric" };
  let locales = ["en-US", "en-GB", "hi-IN"];
  return date.toLocaleDateString(locales[0], options);
}

const roundNumber = num => (Math.round((num + Number.EPSILON) * 100) / 100);

const loggedIn = () => getAuthToken() !== null;
const noData = () => <p>No data available yet...</p>;

export {
  getAuthToken,
  getRequestConfig,
  formatDate,
  roundNumber,
  loggedIn,
  getCurrentUserId,
  getCurrentUserType,
  getCurrentUserAddress,
  getServiceOfferings,
  noData
}

