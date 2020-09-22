import axios from 'axios';

import { API_URL } from '../../utils/constants';
import { STATUSES, METHODS, createApiAction, createApiReducer, getTokenConfig, displayErrorMsgOrUnauth } from './helpers';

export const ENTITY_NAME = 'storyprogresses';

// REDUCER
const storyProgressesReducer = createApiReducer(ENTITY_NAME);
export default storyProgressesReducer;

// OPERATIONS
export const createStoryProgress = (storyId, { event_type, date, description }) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

    return axios.post(
        `${API_URL}/stories/${storyId}/progress/`,
        {
            event_type,
            date,
            description,
        },
        getTokenConfig(getState)
    )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE, res.data));
        })
        .catch(err => {
            displayErrorMsgOrUnauth(err, dispatch, "Unable to create progress.");
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE, err));
        });
    ;
};

export const retrieveStoryProgress = (storyId, storyProgressId) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE, storyProgressId));

    return axios.get(
        `${API_URL}/stories/${storyId}/progress/${storyProgressId}/`,
        getTokenConfig(getState)
    )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
        })
        .catch(err => {
            displayErrorMsgOrUnauth(err, dispatch, "Unable to fetch progress.");
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE, err));
        });
    ;
};

export const updateStoryProgress = (storyId, { id, event_type, date, description }) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE, id));

    return axios.patch(
        `${API_URL}/stories/${storyId}/progress/${id}/`,
        {
            event_type,
            date,
            description,
        },
        getTokenConfig(getState)
    )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, res.data));
        })
        .catch(err => {
            displayErrorMsgOrUnauth(err, dispatch, "Unable to update progress.");
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE, err));
        });
};

export const deleteStoryProgress = (storyId, storyProgressId) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));

    return axios.delete(
        `${API_URL}/stories/${storyId}/progress/${storyProgressId}/`,
        getTokenConfig(getState)
    )
        .then(() => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE, storyProgressId));
        })
        .catch(err => {
            displayErrorMsgOrUnauth(err, dispatch, "Unable to delete progress.");
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE, err));
        });
};

export const listStoryProgresses = storyId => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));

    return axios.get(
        `${API_URL}/stories/${storyId}/progress/`,
        getTokenConfig(getState),
    )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST, res.data));
        })
        .catch(err => {
            displayErrorMsgOrUnauth(err, dispatch, "Unable to fetch progresses.");
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST, err));
        });
};

// SELECTORS
export const selectStoryProgressesLoading = state => state.storyProgressesReducer.loading[METHODS.LIST] === true;
export const selectStoryProgressesError = state => state.storyProgressesReducer.error[METHODS.LIST];
export const selectStoryProgresses = state => state.storyProgressesReducer.items;

export const selectStoryProgressLoading = state => state.storyProgressesReducer.loading[METHODS.RETRIEVE] === true;
export const selectStoryProgressError = state => state.storyProgressesReducer.error[METHODS.RETRIEVE];
export const selectStoryProgress = state => state.storyProgressesReducer.item;
