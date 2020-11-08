import React from 'react'
import { cleanup, act } from '@testing-library/react'

import Stationery from './index.js';
import { renderWithReduxRouter } from './../../../utils/tests';

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


it('should take a snapshot', async () => {
    let asFragment = {};
    await act(async () => { ({ asFragment } = renderWithReduxRouter(<Stationery />)) });
    expect(asFragment()).toMatchSnapshot();
})