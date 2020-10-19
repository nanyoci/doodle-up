import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Page from '../../common/Page';
import { selectStories, listStories, selectStoriesLoading } from '../../../redux/ducks/stories';
import './index.css';

function StorySelection({ stories, listStories, isLoading }) {
	useEffect(() => {
		listStories()
	}, [listStories]);

	return (

		<Page isLoading={isLoading}>
			<h1>Story Books</h1>
			{
				!isLoading && (
					stories.length !== 0
						?
						<div className="story-boxes">{
							stories.map(story =>
								<div className="story-box" key={story.id}>
									<Link to={`/stories/${story.id}`} className="story-box-link">
										<img src={`${story.cover_image}`} alt={story.story_title} />
									</Link>
									<h2>{story.story_title}</h2>
								</div>
							)}
						</div>
						: <p>No stories available.</p>
				)
			}
		</Page>
	)
}

StorySelection.propTypes = {
	stories: PropTypes.array.isRequired,
	isLoading: PropTypes.bool
};
const mapStateToProps = state => ({
	stories: selectStories(state),
	isLoading: selectStoriesLoading(state)
});

const dispatchers = {
	listStories,
};

export default connect(mapStateToProps, dispatchers)(StorySelection);

