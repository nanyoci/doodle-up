import { combineReducers } from 'redux';

import errorsReducer from './ducks/errors';
import authReducer from './ducks/auth';

import storiesReducer from './ducks/stories';
import progressesReducer from './ducks/progresses';

export default combineReducers({
	// Common
	errorsReducer,
	authReducer,
	
	// Stories
	storiesReducer,
	progressesReducer,
});