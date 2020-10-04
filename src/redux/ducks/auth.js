import axios from 'axios';
// import Cookies from 'js-cookie';

import { API_URL } from '../../utils/constants';
// import { getActionTypes, createAction } from './helpers';
// import { displayError } from './errors';

// ACTION TYPES
export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

const initialState = {
	// userLoading: true,
	// userFailed: null,
	// user: {},
	username: localStorage.getItem("username")
};
export default function (state = initialState, action) {
	switch (action.type) {
		case LOGIN:

			// const currentTime = getCurrentTime()

			localStorage.setItem("username", action.payload);

			return {
				...state,
				username: action.payload
			}

		case LOGOUT:
			localStorage.removeItem("username");

			return {
				...state,
				// user: {},
				username: ''
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

// OPERATIONS
export const authenticateLogin = userData => dispatch => {
	var formdata = new FormData();
	formdata.append("email", userData.email);
	formdata.append("password", userData.password);
	console.log("authenticating login: ", userData)
	axios
		.post(
			`${API_URL}/signin`,
			formdata,
			{
				'Content-Type': 'application/x-www-form-urlencoded',
				"Access-Control-Allow-Origin": "*",
			},
		)
		.then(res => {
			console.log(res.data)
			dispatch(loginAction(res.data));
		})
		.catch(err => {
			alert("Failed to login")
			// displayError("Unable to login")(dispatch);
			// dispatch(fetchMeFailureAction());
		});
};

export const register = userData => dispatch => {
	var formdata = new FormData();
	formdata.append("email", userData.email);
	formdata.append("username", userData.username);
	formdata.append("password", userData.password);

	axios
		.post(
			`${API_URL}/signup`,
			// `${API_URL}/register`,
			formdata,
		)
		.then(res => {
			if (res.data == "User created") {
				dispatch(registerAction(userData.username))
			}
			else {
				if (res.data == "The email is already in use") {
					alert("The email is already taken. Please try to sign in")
				}
				else {
					alert("200")
				}

			}
		})
		.catch(err => {
			alert("Failed to login")
			// displayError("Unable to login")(dispatch);
			// dispatch(fetchMeFailureAction());
		});
};


export const logout = () => (dispatch, getState) => {
	// No endpoints for logout
	dispatch(logoutAction());
	// axios
	//     .delete(
	//         `${API_URL}/oauth/revoke`,
	//         getTokenConfig(getState)
	//     )
	//     .then(() => {
	//         dispatch(logoutAction());
	//     })
	//     .catch(err => {
	//         displayError("Unable to logout")(dispatch);
	//     });
};

// export const refreshTokenLogin = () => (dispatch, getState) => {
//     var formdata = new FormData();
//     formdata.append("refresh_token", getState().authReducer.refresh_token);
//     formdata.append("grant_type", "refresh_token");

//     axios
//         .post(
//             `${API_URL}/oauth/token`,
//             formdata,
//             {
//                 headers: {
//                     'Authorization': `Basic ${btoa('my-client:my-secret')}`
//                 }
//             },
//         )
//         .then(res => {
//             fetchMe(res.data.access_token)(dispatch);
//             dispatch(loginAction(res.data));
//         })
//         .catch(err => {
//             displayError("Unable to login")(dispatch);
//             dispatch(fetchMeFailureAction());
//         });
// };

// SELECTOR
export const selectUsername = state => state.authReducer.username;
