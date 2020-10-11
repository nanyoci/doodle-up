import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Page from '../Page';
import Guessing from '../Guessing';
import Draw from '../Draw';
import StoryPage from '../StoryPage';
import { retrieveStory, selectStory, selectStoryLoading } from '../../redux/ducks/stories';
import { createStoryProgress } from '../../redux/ducks/storyProgresses';

const MODES = {
	GUESSING: "guessing",
	DRAWING: "drawing",
	STORY: "storypage",
}

// TODO: Create for completed books
function StoryManager({ story, storyLoading, match, retrieveStory, createStoryProgress }) {
	const storyId = match.params.id;
	const [currentStage, setCurrentStage] = useState(7);
	
	useEffect(() => {
		retrieveStory(storyId);
	}, [])

	if (storyLoading)
		return <Page isLoading={true} />

	const handleComplete = () => {
		const stageId = story.stages[currentStage].stage_id;
		createStoryProgress(storyId, stageId);
		setCurrentStage(currentStage + 1);
	}
	
	const handleCompleteDrawing = drawing => {
		const stageId = story.stages[currentStage].stage_id;
		createStoryProgress(storyId, stageId);
		setCurrentStage(currentStage + 1);
	}

	const stage = story.stages[currentStage];
	let mode = stage.type;

	switch (mode) {
		case MODES.GUESSING:
			return (
				<Guessing
					stage={stage}
					onComplete={handleComplete}
				/>
			);
		
		case MODES.DRAWING:
			return (
				<Draw
					stage={stage}
					onComplete={handleCompleteDrawing}
				/>
			);
		
		case MODES.STORY:
			return (
				<StoryPage
					stage={stage}
					onComplete={handleComplete}
				/>
			);
				
		default:
			break;
	}
}

StoryManager.propTypes = {
	story: PropTypes.object,
	storyLoading: PropTypes.bool,
};
const mapStateToProps = state => ({
	story: selectStory(state),
	storyLoading: selectStoryLoading(state),
});

const dispatchers = {
	retrieveStory,
	createStoryProgress,
};

export default connect(mapStateToProps, dispatchers)(StoryManager);
