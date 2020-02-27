const constants = {
	LOGIN_USER: "LOGIN_USER",
	LOGOUT_USER: "LOGOUT_USER",
	ADD_USER: "ADD_USER",
	EDIT_USER: "EDIT_USER",
	DELETE_USER: "DELETE_USER",
	START_FETCHING: "START_FETCHING",
  FINISH_FETCHING: "FINISH_FETCHING",
  FETCH_SUCCESS: "FETCH_SUCCESS",
	ADD_ERROR: "ADD_ERROR",
	CLEAR_ERROR: "CLEAR_ERROR",
	USER_IN_VIEW: "USER_IN_VIEW", // may not be necessary
	ACTIONS: {
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
    LOGIN: "http://localhost:3000/api/v1/login",
    PROFILE: "http://localhost:3000/api/v1/profile"
  },
  LS: { // LS = localstorage
    AUTH: "auth_token"
  }
};

export default constants;

