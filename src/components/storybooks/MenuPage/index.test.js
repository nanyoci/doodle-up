import React from 'react'
import { cleanup, act } from '@testing-library/react'

import MenuPage from './index.js';
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

it('should take a snapshot', async () => {
	let asFragment = {};
	await act(async () => { ({ asFragment } = renderWithReduxRouter(<MenuPage />)) });
	expect(asFragment()).toMatchSnapshot();
})
