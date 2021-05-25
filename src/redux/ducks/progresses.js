import { STATUSES, METHODS, createApiAction } from './helpers';

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

// OPERATIONS
export const updateProgressStage = (storyId, stageId, drawing=null) => (dispatch) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE), storyId);
    dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, {
        stage_id: stageId,
        completed: true,
        image_url: drawing,
    }));
};

export const retrieveProgress = (storyId) => (dispatch) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE, storyId));
    dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, {
        stages: [],
        id: storyId,
    }));
};

// SELECTORS
export const selectProgressLoading = state => state.progressesReducer.loading[METHODS.RETRIEVE] === true;
export const selectProgressError = state => state.progressesReducer.error[METHODS.RETRIEVE];
export const selectProgress = state => state.progressesReducer.item;

export const selectProgressUpdateLoading = state => state.progressesReducer.loading[METHODS.UPDATE] === true;
