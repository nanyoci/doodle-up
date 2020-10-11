import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import Page from '../Page';
import './index.css';

export default function StoryCompletionPage({story}) {
	return (
		<Page>
			<h1>You've reached the end of {story.story_title}</h1>
			<img className="story-completion-cover" src={story.cover_image} />
		</Page>
	)
}
