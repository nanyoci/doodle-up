import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Page from '../../common/Page';
import { selectStories, listStories, selectStoriesLoading } from '../../../redux/ducks/stories';
import { selectProgresses, listProgresses, selectProgressesLoading } from '../../../redux/ducks/progresses';
import './index.css';

function StorySelection({ stories, listStories, storiesLoading, progresses, listProgresses, progressesLoading }) {
	useEffect(() => {
		listStories();
		listProgresses();
	}, [listStories, listProgresses]);
	const isLoading = storiesLoading || progressesLoading;

	var storyBoxes = [];

	if (!isLoading && stories) {
		storyBoxes = stories
			.filter(story => progresses[story.id].completed)
			.map(story =>
				<div className="story-box" key={story}>
					<Link to={`/my-story-books/${story.id}`} className="story-box-link">
						<img src={`${story.cover_image}`} alt="Dinosaur story" />
					</Link>
					<h2>{story.story_title}</h2>
				</div>
			);
	}


	return (
		<Page isLoading={isLoading}>
			<h1>My Story Books</h1>
			{
				!isLoading && (
					storyBoxes.length !== 0
						?
						<div className="story-boxes">
							{storyBoxes}
						</div>
						: <h2>No stories completed.</h2>
				)
			}
		</Page>
	)
}

const mapStateToProps = state => ({
	stories: selectStories(state),
	storiesLoading: selectStoriesLoading(state),
	progresses: selectProgresses(state),
	progressesLoading: selectProgressesLoading(state),
});

const dispatchers = {
	listStories,
	listProgresses,
};

export default connect(mapStateToProps, dispatchers)(StorySelection);

