
const constants = {
	LOGIN_USER: "LOGIN_USER",
	LOGOUT_USER: "LOGOUT_USER",
	ADD_USER: "ADD_USER",
	EDIT_USER: "EDIT_USER",
	DELETE_USER: "DELETE_USER",
	ADD_SERVICE: "ADD_SERVICE",
	ADD_SERVICES: "ADD_SERVICES", // plural
	EDIT_SERVICE: "EDIT_SERVICE",
	DELETE_SERVICE: "DELETE_SERVICE",
	ADD_ERROR: "ADD_ERROR",
	CLEAR_ERROR: "CLEAR_ERROR",
	USER_IN_VIEW: "USER_IN_VIEW", // may not be necessary
	ACTIONS: {
		FETCHING: "FETCHING",
		FINISH_FETCHING: "FINISH_FETCHING",
		FETCH_SUCCESS: "FETCH_SUCCESS",
		ADDING: "ADDING",
		FINISH_ADDING: "FINISH_ADDING",
		VIEWING: "VIEWING",
		FINISH_VIEWING: "FINISH_VIEWING",
		DELETING: "DELETING",
		FINISH_DELETING: "FINISH_DELETING",
		EDITING: "EDITING",
		FINISH_EDITING: "FINISH_EDITING",
	},
	HTTP: {
		DELETE: "DELETE",
		GET: "GET",
		PATCH: "PATCH",
		POST: "POST",
		PUT: "PUT",
		HEADERS: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
	},
  URLS: {
		ADDRESSES: "http://localhost:3000/api/v1/addresses",
    LOGIN: "http://localhost:3000/api/v1/login",
		PRINTS: "http://localhost:3000/api/v1/prints",
		PROFILE: "http://localhost:3000/api/v1/profile",
		SERVICES: "http://localhost:3000/api/v1/services",
		USERS: "http://localhost:3000/api/v1/users"
  },
  LS: { // LS = localstorage
    AUTH: "auth_token"
  }
};

export default constants;

