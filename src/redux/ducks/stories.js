import axios from 'axios';

import { API_URL } from '../../utils/constants';
import { STATUSES, METHODS, createApiAction, createApiReducer, getTokenConfig, displayErrorMsgOrUnauth } from './helpers';

export const ENTITY_NAME = 'stories';

// REDUCER
const storiesReducer = createApiReducer(ENTITY_NAME);
export default storiesReducer;

// OPERATIONS
export const createStory = ({ title, description, frequency, color }) => (dispatch, getState) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

	return axios.post(
		`${API_URL}/${ENTITY_NAME}/`,
		{
			title,
			description,
			frequency,
			color,
		},
		getTokenConfig(getState)
	)
		.then(res => {
			dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE, {
				...res.data,
				days_since: 0,
			}));
		})
		.catch(err => {
			displayErrorMsgOrUnauth(err, dispatch, "Unable to create story.");
			dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE, err));
		});
	;
};

export const retrieveStory = storyId => (dispatch, getState) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE, storyId));

	return axios.get(
		`${API_URL}/${ENTITY_NAME}/${storyId}/`,
		getTokenConfig(getState)
	)
		.then(res => {
			dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
		})
		.catch(err => {
			displayErrorMsgOrUnauth(err, dispatch, "Unable to fetch story.");
			dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE, err));
		});
	;
};

export const updateStory = ({ id, title, description, frequency, color }) => (dispatch, getState) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE, id));

	return axios.patch(
		`${API_URL}/${ENTITY_NAME}/${id}/`,
		{
			title,
			description,
			frequency,
			color,
		},
		getTokenConfig(getState)
	)
		.then(res => {
			dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, res.data));
		})
		.catch(err => {
			displayErrorMsgOrUnauth(err, dispatch, "Unable to update story.");
			dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE, err));
		});
};

export const deleteStory = storyId => (dispatch, getState) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));

	return axios.delete(
		`${API_URL}/${ENTITY_NAME}/${storyId}/`,
		getTokenConfig(getState)
	)
		.then(() => {
			dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE, storyId));
		})
		.catch(err => {
			displayErrorMsgOrUnauth(err, dispatch, "Unable to delete story.");
			dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE, err));
		});
};

export const listStories = () => (dispatch, getState) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));

	return axios.get(
		`${API_URL}/content/all`,
		getTokenConfig(getState),
	)
		.then(res => {
			dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST, res.data));
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
