// import axios from 'axios';
// // import Cookies from 'js-cookie';

// import { API_URL } from '../../utils/constants';
// import { getActionTypes, createAction } from './helpers';
// import { displayError } from './errors';

// ACTION TYPES
// export const REGISTER = 'REGISTER';
// export const LOGIN = 'LOGIN';
// export const LOGOUT = 'LOGOUT';
// export const ERROR = "ERROR";

// const initialState = {
// 	error: "",
// 	username: localStorage.getItem("username")
// };
// export default function (state = initialState, action) {
// 	switch (action.type) {
// 		case REGISTER:
// 		case LOGIN:
// 			localStorage.setItem("username", action.payload);
// 			return {
// 				...state,
// 				username: action.payload,
// 				error: ""
// 			}

// 		case LOGOUT:
// 			localStorage.removeItem("username");
// 			return {
// 				...state,
// 				// user: {},
// 				username: null
// 			}

// 		case ERROR:
// 			return {
// 				...state,
// 				error: action.payload
// 			}

// 		default:
// 			return state;
// 	}

// }

// // ACTION CREATORS
// export function registerAction(payload) {
// 	return {
// 		type: REGISTER,
// 		payload: payload,
// 	}
// }
// export function loginAction(payload) {
// 	return {
// 		type: LOGIN,
// 		payload: payload,
// 	}
// }

// export function logoutAction() {
// 	return {
// 		type: LOGOUT,
// 	}
// }

// export function errorAction(payload) {
// 	return {
// 		type: ERROR,
// 		payload: payload
// 	}
// }

// // OPERATIONS
// export const authenticateLogin = userData => dispatch => {
// 	var formdata = new FormData();
// 	formdata.append("email", userData.email);
// 	formdata.append("password", userData.password);
// 	console.log("authenticating login: ", userData)
// 	axios
// 		.post(
// 			`${API_URL}/signin`,
// 			formdata,
// 		)
// 		.then(res => {
// 			console.log(res.data)
// 			dispatch(loginAction(res.data));
// 		})
// 		.catch(err => {
// 			dispatch(errorAction("Email and password do not match"))
// 			// displayError("Unable to login")(dispatch);
// 			// dispatch(fetchMeFailureAction());
// 		});
// };

// export const authenticateSignUp = userData => dispatch => {
// 	if (userData.passwordOne != userData.passwordTwo) {
// 		dispatch(errorAction("Passwords do not match"))
// 		return
// 	}
// 	console.log("here")
// 	var formdata = new FormData();
// 	console.log(userData)
// 	formdata.append("email", userData.email);
// 	formdata.append("username", userData.username);
// 	formdata.append("password", userData.passwordOne);

// 	axios
// 		.post(
// 			`${API_URL}/signup`,
// 			formdata,
// 		)
// 		.then(res => {
// 			if (res.data == "User created.") {
// 				dispatch(registerAction(userData.username))
// 			}
// 			// else {
// 			// 	if (res.data == "The email is already in use") {
// 			// 	}
// 			// }
// 		})
// 		.catch(err => {
// 			dispatch(errorAction("Oops! There is a problem with registration."))
// 			// displayError("Unable to login")(dispatch);
// 			// dispatch(fetchMeFailureAction());
// 		});
// };


// export const authLogout = () => (dispatch) => {
// 	// No endpoints for logout
// 	dispatch(logoutAction());

// };

// // export const refreshTokenLogin = () => (dispatch, getState) => {
// //     var formdata = new FormData();
// //     formdata.append("refresh_token", getState().authReducer.refresh_token);
// //     formdata.append("grant_type", "refresh_token");

// //     axios
// //         .post(
// //             `${API_URL}/oauth/token`,
// //             formdata,
// //             {
// //                 headers: {
// //                     'Authorization': `Basic ${btoa('my-client:my-secret')}`
// //                 }
// //             },
// //         )
// //         .then(res => {
// //             fetchMe(res.data.access_token)(dispatch);
// //             dispatch(loginAction(res.data));
// //         })
// //         .catch(err => {
// //             displayError("Unable to login")(dispatch);
// //             dispatch(fetchMeFailureAction());
// //         });
// // };

// // SELECTOR
// export const selectUsername = state => state.authReducer.username;
// export const selectError = state => state.authReducer.error;


import axios from 'axios';

import { API_URL } from '../../utils/constants';
import { STATUSES, METHODS, createApiAction, createApiReducer, getTokenConfig, displayErrorMsgOrUnauth } from './helpers';

export const ENTITY_NAME = 'auth';

// REDUCER
const authReducer = createApiReducer(ENTITY_NAME);
export default authReducer;

// OPERATIONS

export const authenticateSignUp = userData => dispatch => {
	if (userData.passwordOne != userData.passwordTwo) {
		dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE, "Passwords do not match"));
		return
	}

	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));

	var formdata = new FormData();
	formdata.append("email", userData.email);
	formdata.append("username", userData.username);
	formdata.append("password", userData.passwordOne);

	return axios.post(
		`${API_URL}/signup`,
		formdata,
		// getTokenConfig(getState),
	)
		.then(res => {
			if (res.data == "User created.") {
				dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
				localStorage.setItem("username", res.data);
			}
		})
		.catch(err => {
			// displayErrorMsgOrUnauth(err, dispatch, "Email and password do not match");
			// dispatch(errorAction("Email and password do not match"))
			dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE, "Oops! There is a problem with registration."));
			// dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE, err));
		});

};

export const authenticateLogin = (userData) => (dispatch, getState) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));

	var formdata = new FormData();
	formdata.append("email", userData.email);
	formdata.append("password", userData.password);
	console.log("authenticating login: ", userData)

	return axios.post(
		`${API_URL}/signin`,
		formdata
		// getTokenConfig(getState),
	)
		.then(res => {
			dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
			localStorage.setItem("username", res.data);
		})
		.catch(err => {
			// displayErrorMsgOrUnauth(err, dispatch, "Email and password do not match");
			// dispatch(errorAction("Email and password do not match"))
			dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE, "Email and password do not match"));
		});
};

export const authLogout = () => (dispatch) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));
	localStorage.removeItem("username")
	dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, null));

};

// SELECTORS
export const selectAuthLoading = state => state.authReducer.loading[METHODS.RETRIEVE];
export const selectAuthError = state => state.authReducer.error[METHODS.RETRIEVE];
export const selectAuthUser = state => state.authReducer.item;