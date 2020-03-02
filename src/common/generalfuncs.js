
import C from "../constants";

export function login(user) {
  
}

const getAuthToken = () => localStorage.getItem(C.LS.AUTH);

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

export {
  getAuthToken,
  getRequestConfig,
  loggedIn
}

