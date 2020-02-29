
import C from "../constants";
import fetch from "isomorphic-fetch";
import {
  startFetching,
  finishFetching,
  addError
} from "./general";

export const addService = service => {
  return { type: C.ADD_SERVICE, service };
}

export const addServices = services => {
  return { type: C.ADD_SERVICES, services };
}

// API calls
export const fetchServices = () => dispatch => {
  dispatch(startFetching());
  fetch(C.URLS.SERVICES)
    .then(response => response.json())
    .then(services => {
      dispatch(addServices(services));
      dispatch(finishFetching()); // TODO: should this be here?
    })
    .catch(error => {
      dispatch(addError(error.message));
      dispatch(finishFetching());
    });
}

