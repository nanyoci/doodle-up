import React from 'react'
import { cleanup, act } from '@testing-library/react'

import cover from './sample/cover.png';
import StoryCompletionPage from './index.js';
import { renderWithReduxRouter } from './../../../utils/tests';

jest.mock('axios');

beforeEach(() => {
	window.HTMLMediaElement.prototype.load = () => { /* do nothing */ };
	window.HTMLMediaElement.prototype.play = () => { /* do nothing */ };
	window.HTMLMediaElement.prototype.pause = () => { /* do nothing */ };
	window.HTMLMediaElement.prototype.addTextTrack = () => { /* do nothing */ };
});

afterEach(() => {
	cleanup();
	jest.clearAllMocks();
});

const story = {
	story_title: "Three Little Pigs",
	cover_image: cover,
}

it('should take a snapshot', async () => {
	let asFragment = {};
	await act(async () => {
		({ asFragment } = renderWithReduxRouter(
			<StoryCompletionPage
				story={story}
				isReadOnly={false}
				onReset={() => { }}
			/>
		))
	});
	expect(asFragment()).toMatchSnapshot();
})
