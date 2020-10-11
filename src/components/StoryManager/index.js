import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Page from '../Page';
import Guessing from '../Guessing';
import Draw from '../Draw';
import StoryPage from '../StoryPage';
import StoryCompletionPage from '../StoryCompletionPage';
import { retrieveStory, selectStory, selectStoryLoading } from '../../redux/ducks/stories';
import { createProgress } from '../../redux/ducks/progresses';

const MODES = {
	GUESSING: "guessing",
	DRAWING: "drawing",
	STORY: "storypage",
}


function StoryManager({ isReadOnly, story, storyLoading, match, retrieveStory, createProgress }) {
	const storyId = match.params.id;
	const [currentStage, setCurrentStage] = useState(5);
	
	useEffect(() => {
		retrieveStory(storyId);
	}, [])

	if (storyLoading)
		return <Page isLoading={true} />
	
	const goToNextStage = () => {
		let nextStage = currentStage + 1;
		
		if (isReadOnly) {
			while (nextStage < story.stages.length) {
				if (story.stages[nextStage].type !== MODES.STORY)
					nextStage++;
				else
					break;
			}
		}

		setCurrentStage(nextStage);
	}

	const handleComplete = () => {
		const stageId = story.stages[currentStage].stage_id;
		createProgress(storyId, stageId);
		goToNextStage();
	}
	
	const handleCompleteDrawing = drawing => {
		const stageId = story.stages[currentStage].stage_id;
		createProgress(storyId, stageId, drawing);
		goToNextStage();
	}

	const stage = story.stages[currentStage];

	if (currentStage >= story.stages.length)
		return <StoryCompletionPage story={story} />;

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
					storyId={storyId}
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
	createProgress,
};

export default connect(mapStateToProps, dispatchers)(StoryManager);
