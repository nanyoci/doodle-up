import axios from 'axios';

import { API_URL } from '../../utils/constants';
import { STATUSES, METHODS, createApiAction, createApiReducer, displayErrorMsgOrUnauth } from './helpers';

export const ENTITY_NAME = 'stories';

// REDUCER
const storiesReducer = createApiReducer(ENTITY_NAME);
export default storiesReducer;

// OPERATIONS
export const retrieveStory = (storyId) => (dispatch) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE, storyId));

	return axios.get(
		`${API_URL}/content`, {
			params: {
				storyid: storyId
			}
		}
	)
		.then(res => {
			console.log(res.data)
			dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
		})
		.catch(err => {
			displayErrorMsgOrUnauth(err, dispatch, "Unable to fetch story.");
			dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE, err));
		});
	;
};

export const listStories = () => (dispatch) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));

	return axios.get(
		`${API_URL}/content/all`,
	)
		.then(res => {
			dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST, res.data.results));
			console.log(res.data.results)
		})
		.catch(err => {
			displayErrorMsgOrUnauth(err, dispatch, "Unable to fetch stories.");
			dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST, err));
		});
};

// SELECTORS
export const selectStoriesLoading = state => state.storiesReducer.loading[METHODS.LIST] === true;
export const selectStoriesError = state => state.storiesReducer.error[METHODS.LIST];
export const selectStories = state => state.storiesReducer.items;

export const selectStoryLoading = state => state.storiesReducer.loading[METHODS.RETRIEVE] === true;
export const selectStoryError = state => state.storiesReducer.error[METHODS.RETRIEVE];
export const selectStory = state => state.storiesReducer.item;
export const selectStoryId = state => state.storiesReducer.itemId;
