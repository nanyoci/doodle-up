import React from 'react'
import { cleanup, act } from '@testing-library/react'
import axiosMock from 'axios';

import cover from './sample/cover.png';
import StorySelection from './index.js';
import { renderWithReduxRouter } from './../../../utils/tests';

jest.mock('axios');

beforeEach(() => {
  window.HTMLMediaElement.prototype.load = () => { /* do nothing */ };
  window.HTMLMediaElement.prototype.play = () => { /* do nothing */ };
  window.HTMLMediaElement.prototype.pause = () => { /* do nothing */ };
  window.HTMLMediaElement.prototype.addTextTrack = () => { /* do nothing */ };

  axiosMock.get.mockResolvedValue({
    data: {
      results: [
        {
          cover_image: cover,
          id: "001",
          story_title: "Goldilocks and the Three Bears"
        }
      ]
    }

  });
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

it('should take a snapshot', async () => {
  let asFragment = {};
  await act(async () => { ({ asFragment } = renderWithReduxRouter(<StorySelection />)) });
  expect(asFragment()).toMatchSnapshot();
})
