import { combineReducers } from 'redux';

import errorsReducer from './ducks/errors';
import authReducer from './ducks/auth';
import profileReducer from './ducks/profile';

import storiesReducer from './ducks/stories';
import storyProgressesReducer from './ducks/storyProgresses';

export default combineReducers({
	// Common
	errorsReducer,
	authReducer,
	profileReducer,
	
	// Stories
	storiesReducer,
	storyProgressesReducer,
});