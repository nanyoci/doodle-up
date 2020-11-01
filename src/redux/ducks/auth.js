import axios from 'axios';
// import Cookies from 'js-cookie';

import { API_URL } from '../../utils/constants';

// ACTION TYPES
export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ERROR = "ERROR";
export const LOADING = "LOADING";
export const INIT = "INIT";

const initialState = {
	error: "",
	isLoading: false,
	username: localStorage.getItem("username")
};
export default function (state = initialState, action) {
	switch (action.type) {
		case REGISTER:
		case LOGIN:
			localStorage.setItem("username", action.payload);
			return {
				...state,
				username: action.payload,
				error: "",
				isLoading: false
			}

		case LOGOUT:
			localStorage.removeItem("username");
			return {
				...state,
				// user: {},
				username: null,
				isLoading: false
			}

		case ERROR:
			return {
				...state,
				error: action.payload,
				isLoading: false
			}
		case LOADING:
			return {
				...state,
				isLoading: true
			}
		case INIT:
			return {
				...state,
				error: ""
			}

		default:
			return state;
	}

}

// ACTION CREATORS
export function registerAction(payload) {
	return {
		type: REGISTER,
		payload: payload,
	}
}
export function loginAction(payload) {
	return {
		type: LOGIN,
		payload: payload,
	}
}

export function logoutAction() {
	return {
		type: LOGOUT,
	}
}

export function errorAction(payload) {
	return {
		type: ERROR,
		payload: payload
	}
}

export function initAuth() {
	return {
		type: INIT,
	}
}
export function authLoading() {
	return {
		type: LOADING,
	}
}

// OPERATIONS
export const authInit = () => dispatch => {
	dispatch(initAuth())
}

export const authenticateLogin = userData => dispatch => {
	dispatch(authLoading())

	var formdata = new FormData();
	formdata.append("email", userData.email);
	formdata.append("password", userData.password);

	axios
		.post(
			`${API_URL}/signin`,
			formdata,
		)
		.then(res => {
			dispatch(loginAction(res.data));
		})
		.catch(err => {
			dispatch(errorAction("Email and password do not match"))
			// displayError("Unable to login")(dispatch);
			// dispatch(fetchMeFailureAction());
		});
};

export const authenticateSignUp = userData => dispatch => {
	if (userData.passwordOne !== userData.passwordTwo) {
		dispatch(errorAction("Passwords do not match"))
		return
	}

	dispatch(authLoading())
	var formdata = new FormData();

	formdata.append("email", userData.email);
	formdata.append("username", userData.username);
	formdata.append("password", userData.passwordOne);

	axios
		.post(
			`${API_URL}/signup`,
			formdata,
		)
		.then(res => {
			if (res.data == "User created.") {
				dispatch(registerAction(userData.username))
			}
			// else {
			// 	if (res.data === "The email is already in use") {
			// 	}
			// }
		})
		.catch(err => {
			dispatch(errorAction("Oops! There is a problem with registration."))
			// displayError("Unable to login")(dispatch);
			// dispatch(fetchMeFailureAction());
		});
};


export const authLogout = () => (dispatch) => {
	// No endpoints for logout
	dispatch(logoutAction());

};


// SELECTOR
export const selectAuthUser = state => state.authReducer.username;
export const selectAuthError = state => state.authReducer.error;
export const selectAuthLoading = state => state.authReducer.isLoading;

