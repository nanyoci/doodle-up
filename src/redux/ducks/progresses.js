import axios from 'axios';

import { API_URL } from '../../utils/constants';
import { STATUSES, METHODS, createApiAction, createApiReducer, displayErrorMsgOrUnauth } from './helpers';

export const ENTITY_NAME = 'progresses';

// REDUCER
const progressesReducer = createApiReducer(ENTITY_NAME);
export default progressesReducer;

function dataURIToBlob(dataURI, ) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i);
    
    var blob = new Blob([ab], { type: mimeString });
    return blob;

}

// OPERATIONS
export const createProgress = (storyId, stageId, drawing=null) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

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
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE, res.data));
        })
        .catch(err => {
            displayErrorMsgOrUnauth(err, dispatch, "Unable to create progress.");
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE, err));
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
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
        })
        .catch(err => {
            displayErrorMsgOrUnauth(err, dispatch, "Unable to fetch progress.");
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE, err));
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
