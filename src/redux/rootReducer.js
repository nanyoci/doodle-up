import { combineReducers } from 'redux';

import errorsReducer from './ducks/errors';

import storiesReducer from './ducks/stories';
import progressesReducer from './ducks/progresses';

export default combineReducers({
	// Common
	errorsReducer,
	
	// Stories
	storiesReducer,
	progressesReducer,
});