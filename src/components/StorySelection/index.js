import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import rabbit from '../../assets/rabbit.png';
import dinosaur from '../../assets/dinosaur.png';
import car from '../../assets/car.png';
import Page from '../Page';
import { selectStories, listStories } from '../../redux/ducks/stories';

function StorySelection({ stories, listStories }) {
	useEffect(() => {
		listStories()
	}, []);

	return (

		<Page>
			<h1>My Story Books</h1>
			<div className="story-boxes">
				{
					stories.length !== 0
						? stories.map(story =>
							<div>
								<a className="story-box" href="/">
									<img src={`${story.cover_image}`} alt="Dinosaur story" />
								</a>
								<p>{story.story_title}</p>
							</div>
						)
						: <p>No Stories completed.</p>
				}
			</div>
		</Page>
	)
}

StorySelection.propTypes = {
	stories: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
	stories: selectStories(state),
});

const dispatchers = {
	listStories,
};

export default connect(mapStateToProps, dispatchers)(StorySelection);

