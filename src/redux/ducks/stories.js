import goldilocksContent from "../../story_content/goldilocks_content.json";
import threeLittlePigsContent from "../../story_content/three_little_pigs_content.json";
import uglyDucklingsContent from "../../story_content/ugly_duckling_content.json";

import { STATUSES, METHODS, createApiAction, createApiReducer } from './helpers';

export const ENTITY_NAME = 'stories';

const STORIES = [
	goldilocksContent,
	threeLittlePigsContent,
	uglyDucklingsContent,
];

// REDUCER
const storiesReducer = createApiReducer(ENTITY_NAME);
export default storiesReducer;

// OPERATIONS
export const retrieveStory = (storyId) => (dispatch) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE, storyId));
	dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, STORIES.find(item => item.id === storyId)));
};

export const listStories = () => (dispatch) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));
	dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST, STORIES));
};

// SELECTORS
export const selectStoriesLoading = state => state.storiesReducer.loading[METHODS.LIST] === true;
export const selectStoriesError = state => state.storiesReducer.error[METHODS.LIST];
export const selectStories = state => state.storiesReducer.items;

export const selectStoryLoading = state => state.storiesReducer.loading[METHODS.RETRIEVE] === true;
export const selectStoryError = state => state.storiesReducer.error[METHODS.RETRIEVE];
export const selectStory = state => state.storiesReducer.item;
export const selectStoryId = state => state.storiesReducer.itemId;
