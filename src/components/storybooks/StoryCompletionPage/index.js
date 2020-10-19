import React from 'react';

import Page from '../../common/Page';
import './index.css';

export default function StoryCompletionPage({ story, isReadOnly, onReset }) {
	return (
		<Page>
			<h1>You've reached the end of {story.story_title}</h1>
			<img className="story-completion-cover" src={story.cover_image} alt={story.story_title} />
			{
				!isReadOnly &&
				<div className="text-center mt-4">
					<div className="menu-buttons mb-2">
						<button className="btn btn-primary" onClick={onReset}>Play again?</button>
					</div>
					<p>Take note that this will delete your progress and previous drawings.</p>
				</div>
			}
		</Page>
	)
}
