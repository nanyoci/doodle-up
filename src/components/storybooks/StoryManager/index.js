import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Page from '../../common/Page';
import Guessing from '../../guessing/Guessing';
import Draw from '../../drawing/Draw';
import StoryPage from '../../storypage/StoryPage';
import StoryCompletionPage from '../StoryCompletionPage';
import { retrieveStory, selectStory, selectStoryLoading } from '../../../redux/ducks/stories';
import { retrieveProgress, updateProgressStage, resetProgress, selectProgress, selectProgressLoading, selectProgressupdateLoading } from '../../../redux/ducks/progresses';

const MODES = {
	GUESSING: "guessing",
	DRAWING: "drawing",
	STORY: "storypage",
}

export function StoryManager({ isReadOnly, story, storyLoading, match, retrieveStory, progress, progressLoading, updateProgressStage, retrieveProgress, progressUpdateLoading, resetProgress }) {
	const storyId = match.params.id;
	const [currentStage, setCurrentStage] = useState(null);
	
	useEffect(() => {
		retrieveStory(storyId);
		retrieveProgress(storyId);
	}, [retrieveStory, retrieveProgress, storyId])

	if (storyLoading || progressLoading || progressUpdateLoading)
		return <Page isLoading={true} />;
	
	const goToNextStage = () => {
		let nextStage = currentStage === null ? 0 : currentStage + 1;
		
		if (isReadOnly) {
			console.log(nextStage);
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
		if (!isReadOnly) {
			const stageId = story.stages[currentStage].stage_id;
			updateProgressStage(storyId, stageId);
		}

		goToNextStage();
	}
	
	const handleCompleteDrawing = drawing => {
		if (!isReadOnly) {
			const stageId = story.stages[currentStage].stage_id;
			updateProgressStage(storyId, stageId, drawing);
		}

		goToNextStage();
	}

	const handleReset = () => {
		resetProgress(storyId)
			.then(() => setCurrentStage(0));
	}

	if (currentStage === null) {
		if (isReadOnly) {
			goToNextStage();
		} else if (progress.completed) {
			setCurrentStage(story.stages.length);
		} else {
			let firstStage = 0;
			while (firstStage < story.stages.length) {
				let stageId = story.stages[firstStage].stage_id;
				let progressStage = progress.stages.find(stage => stage.stage_id === stageId);
				if (progressStage && progressStage.completed)
					firstStage++;
				else
					break;
			}
			setCurrentStage(firstStage);
		}
	}

	if (currentStage === null)
		return <Page isLoading={true} />;

	const stage = story.stages[currentStage];

	if (currentStage >= story.stages.length)
		return <StoryCompletionPage story={story} isReadOnly={isReadOnly} onReset={handleReset} />;

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
					progress={progress}
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
	progress: PropTypes.object,
	progressLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
	story: selectStory(state),
	storyLoading: selectStoryLoading(state),
	progress: selectProgress(state),
	progressLoading: selectProgressLoading(state),
	progressUpdateLoading: selectProgressupdateLoading(state),
});

const dispatchers = {
	retrieveStory,
	updateProgressStage,
	retrieveProgress,
	resetProgress,
};

export default connect(mapStateToProps, dispatchers)(StoryManager);
