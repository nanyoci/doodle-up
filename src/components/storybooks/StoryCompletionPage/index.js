import React from 'react';

import Page from '../../common/Page';
import './index.css';

export default function StoryCompletionPage({story}) {
	return (
		<Page>
			<h1>You've reached the end of {story.story_title}</h1>
			<img className="story-completion-cover" src={story.cover_image} alt={story.story_title} />
		</Page>
	)
}
