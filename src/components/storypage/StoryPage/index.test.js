import React from 'react'
import { cleanup, act } from '@testing-library/react'

import audio from "./sample/audio.mp3";
import background from "./sample/background.png";
import drawing from "./sample/drawing.png";
import StoryPage from './index.js';
import { renderWithReduxRouter } from '../../../utils/tests';

jest.mock('axios');
console.warn = jest.fn()

beforeEach(() => {
	window.HTMLMediaElement.prototype.load = () => { /* do nothing */ };
	window.HTMLMediaElement.prototype.play = () => { /* do nothing */ };
	window.HTMLMediaElement.prototype.pause = () => { /* do nothing */ };
})

afterEach(() => {
	cleanup();
	jest.clearAllMocks();
});

const stage = {
	audio,
	description: "The three little pigs left their mother and home to build their own houses.",
	image: background,
	stage_id: 3,
	type: "storypage",
	drawings: [
		{
			left: 900,
			stage_id: 2,
			top: 455,
			width: 200
		}
	],
};

const progress = {
	completed: false,
	stages: [
		{
			completed: true,
			stage_id: 1
		},
		{
			completed: true,
			stage_id: 2,
			image_url: drawing,
		},
	]
};

it('should take a snapshot', async () => {
	let asFragment = {};
	await act(async () => {
		({ asFragment } = renderWithReduxRouter(
			<StoryPage
				stage={stage}
				onComplete={() => { }}
				progress={progress}
			/>
		))
	});
	expect(asFragment()).toMatchSnapshot();
})
