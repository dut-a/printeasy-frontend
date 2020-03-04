
import C from "../constants";
import fetch from "isomorphic-fetch";
import {
  startFetching,
  finishFetching,
  addError
} from "./general";
import { getAuthToken } from "../common/generalfuncs";

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

export const createOrder = printData => dispatch => {
  let reqConf = {
    method: C.HTTP.POST,
    headers: {
      "Authorization": `Bearer ${getAuthToken()}`
    },
    body: printData
  }
  // dispatch(startAdding());
  fetch(C.URLS.PRINTS, reqConf)
    .then(response => response.json())
    .then(data => {
      // TODO: How about returning 'fetch' object from above and doing this 'then' in the calling context?
      dispatch(addOrder(data.print));
      console.log("PRINT data (PlaceOrder)", data);
      // dispatch(finishAdding()); // TODO: should this be here?
    })
    .catch(error => {
      dispatch(addError(error.message));
      // dispatch(finishAdding());
    });
}

