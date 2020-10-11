import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import rabbit from '../../assets/rabbit.png';
import dinosaur from '../../assets/dinosaur.png';
import car from '../../assets/car.png';
import Page from '../Page';
import { selectStories, listStories, selectStoriesLoading } from '../../redux/ducks/stories';

function StorySelection({ stories, listStories, isLoading }) {
	useEffect(() => {
		listStories()
	}, []);

	return (

		<Page isLoading={isLoading}>
			<h1>Story Books</h1>
			<div className="story-boxes">
				{
					!isLoading && (
						stories.length !== 0
							? stories.map(story =>
								<div>
									<Link className="story-box" to={`/stories/${story.id}`}>
										<img src={`${story.cover_image}`} alt="Dinosaur story" />
									</Link>
									<p>{story.story_title}</p>
								</div>
							)
							: <p>No stories available.</p>
					)
				}
			</div>
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

