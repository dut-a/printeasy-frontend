
import C from "../constants";
import fetch from "isomorphic-fetch";
import {
  startFetching,
  finishFetching,
  addError
} from "./general";

export const addOrder = print => {
  return { type: C.ADD_PRINT, print };
}

export const addOrders = prints => {
  return { type: C.ADD_PRINTS, prints };
}

// API calls
export const fetchOrders = requestConfiguration => dispatch => {
  dispatch(startFetching());
  fetch(C.URLS.PRINTS, requestConfiguration)
    .then(response => response.json())
    .then(prints => {
      dispatch(addOrders(prints));
      dispatch(finishFetching()); // TODO: should this be here?
    })
    .catch(error => {
      dispatch(addError(error.message));
      dispatch(finishFetching());
    });
}

