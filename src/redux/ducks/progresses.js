import axios from 'axios';

import { API_URL } from '../../utils/constants';
import { STATUSES, METHODS, createApiAction, displayErrorMsgOrUnauth } from './helpers';

export const ENTITY_NAME = 'progresses';

// REDUCER
const initialState = {
    loading: {
        [METHODS.RETRIEVE]: true,
        [METHODS.UPDATE]: false,
        [METHODS.DELETE]: false,
        [METHODS.LIST]: true,
    },
    error: {
        [METHODS.RETRIEVE]: null,
        [METHODS.UPDATE]: null,
        [METHODS.DELETE]: null,
        [METHODS.LIST]: null,
    },
    items: [],
    item: null,
    itemId: null,
};

function progressesReducer(state = initialState, action) {
    const actionTypePattern = /^(.+)_(.+)_(.+)$/;
    const match = action.type.match(actionTypePattern);

    if (!match)
        return state;

    const actionEntityName = match[1];
    const actionStatus = match[2];
    const actionMethod = match[3];

    if (actionEntityName !== ENTITY_NAME.toUpperCase() || !Object.values(METHODS).includes(actionMethod))
        return state;

    switch (actionStatus) {
        case STATUSES.REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [actionMethod]: true
                },
                error: {
                    ...state.error,
                    [actionMethod]: null
                },
                itemId: (action.payload) ? action.payload : state.itemId,
            };

        case STATUSES.SUCCESS:
            switch (actionMethod) {
                case METHODS.RETRIEVE:
                    return {
                        ...state,
                        loading: {
                            ...state.loading,
                            [actionMethod]: false
                        },
                        item: action.payload,
                    }
                
                case METHODS.UPDATE:
                    return {
                        ...state,
                        loading: {
                            ...state.loading,
                            [actionMethod]: false
                        },
                        item: {
                            stages: [...state.item.stages.filter(stageProgress => stageProgress.stage_id !== action.payload.stage_id), action.payload]
                        },
                    }
                
                case METHODS.DELETE:
                    return {
                        ...state,
                        loading: {
                            ...state.loading,
                            [actionMethod]: false,
                        },
                        item: {
                            completed: false,
                            stages: [],
                        },
                    }

                case METHODS.LIST:
                    return {
                        ...state,
                        loading: {
                            ...state.loading,
                            [actionMethod]: false
                        },
                        items: action.payload,
                    }

                default:
                    return state;
            }

        case STATUSES.FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [actionMethod]: false
                },
                error: {
                    ...state.error,
                    [actionMethod]: action.payload
                },
            };

        default:
            return state;
    }

}
export default progressesReducer;

function dataURIToBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i);
    
    var blob = new Blob([ab], { type: mimeString });
    // var file = new File([blob], "drawing.png");
    return blob;

}

// OPERATIONS
export const updateProgressStage = (storyId, stageId, drawing=null) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE), storyId);

    var formdata = new FormData();
    formdata.append("username", getState().authReducer.username);
	formdata.append("story_id", storyId);
    formdata.append("stage_id", stageId);
    formdata.append("completed", true);

    if (drawing !== null) {
        formdata.append("new_image", dataURIToBlob(drawing));
    }

    return axios.post(
        `${API_URL}/progress`,
        formdata
    )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, {
                stage_id: stageId,
                completed: true,
                image_url: drawing,
            }));
        })
        .catch(err => {
            displayErrorMsgOrUnauth(err, dispatch, "Unable to update stage progress.");
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE, err));
        });
    ;
};

export const retrieveProgress = (storyId) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE, storyId));
    
    return axios.get(
        `${API_URL}/progress`,
        {
            params: {
                username: getState().authReducer.username,
                storyid: storyId,
            }
        }
    )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, {
                ...res.data,
                id: storyId,
            }));
        })
        .catch(err => {
            displayErrorMsgOrUnauth(err, dispatch, "Unable to fetch progress.");
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE, err));
        });
    ;
};

export const resetProgress = storyId => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));
    
    var formdata = new FormData();
    formdata.append("username", getState().authReducer.username);
	formdata.append("storyid", storyId);

	return axios.post(
        `${API_URL}/reset`,
        formdata
    )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE, res.data));
        })
        .catch(err => {
            displayErrorMsgOrUnauth(err, dispatch, "Unable to reset progress.");
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE, err));
        });
    ;
};

export const listProgresses = () => (dispatch, getState) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));

	return axios.get(
        `${API_URL}/progress`,
        {
            params: {
                username: getState().authReducer.username,
            }
        }
    )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST, res.data));
        })
        .catch(err => {
            displayErrorMsgOrUnauth(err, dispatch, "Unable to fetch progresses.");
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST, err));
        });
    ;
};

// SELECTORS
export const selectProgressesLoading = state => state.progressesReducer.loading[METHODS.LIST] === true;
export const selectProgressesError = state => state.progressesReducer.error[METHODS.LIST];
export const selectProgresses = state => state.progressesReducer.items;

export const selectProgressLoading = state => state.progressesReducer.loading[METHODS.RETRIEVE] === true;
export const selectProgressError = state => state.progressesReducer.error[METHODS.RETRIEVE];
export const selectProgress = state => state.progressesReducer.item;

export const selectProgressupdateLoading = state => state.progressesReducer.loading[METHODS.UPDATE] === true;
