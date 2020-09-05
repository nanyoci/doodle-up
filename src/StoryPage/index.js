import React from 'react';

import bg from '../assets/sample-bg.png';
import './index.css';
import drawing from '../assets/drawing-sample.png';
import Page from '../Page';

export default function StoryPage(props) {
	// const {
	// 	drawing,
	// } = props;

	return (
		<Page>
			<div className="story-scene-container">
				<div className="story-scene">
					<img src={bg} className="story-bg" alt="Story background" />
					<img src={drawing} className="story-object" alt="Child's drawing of the story object" />
				</div>
			</div>
			<p className="story-text">Once upon a time, there was a rabbit named Henry.</p>
		</Page>
	)
}
