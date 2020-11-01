import React from 'react'
import { cleanup, act } from '@testing-library/react'

import GuessingOption from './index.js';
import { renderWithReduxRouter } from './../../../utils/tests';

jest.mock('axios');
console.warn = jest.fn()

beforeEach(() => {
    window.HTMLMediaElement.prototype.load = () => { /* do nothing */ };
    window.HTMLMediaElement.prototype.play = () => { /* do nothing */ };
    window.HTMLMediaElement.prototype.pause = () => { /* do nothing */ };
    window.HTMLMediaElement.prototype.addTextTrack = () => { /* do nothing */ };
})

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});


it('should take a snapshot', async () => {
    let asFragment = {};
    await act(async () => { ({ asFragment } = renderWithReduxRouter(<GuessingOption />)) });
    expect(asFragment()).toMatchSnapshot();
})
