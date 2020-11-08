import React from 'react'
import { cleanup, fireEvent, waitForElement, act, screen } from '@testing-library/react'

import Guessing from './index.js';
import fakeImage from './../../../assets/drawing-sample.png';
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

const stage = {
    options: {
        "Bear": "https://firebasestorage.googleapis.com/v0/b/doodleup-f1847.appspot.com/o/Content%2F001%2Fbear.mp3?alt=media",
        "Bed": "https://firebasestorage.googleapis.com/v0/b/doodleup-f1847.appspot.com/o/Content%2F001%2Fbed.mp3?alt=media",
        "Chair": "https://firebasestorage.googleapis.com/v0/b/doodleup-f1847.appspot.com/o/Content%2F001%2Fchair.mp3?alt=media",
        "Porridge": "https://firebasestorage.googleapis.com/v0/b/doodleup-f1847.appspot.com/o/Content%2F001%2Fporridge.mp3?alt=media"
    },
    answerText: "Chair",
    image: fakeImage,
}

it('should take a snapshot', async () => {
    let asFragment = {};
    await act(async () => { ({ asFragment } = renderWithReduxRouter(<Guessing stage={stage} />)) });
    expect(asFragment()).toMatchSnapshot();
})

// it('displays correct ui after correct answer is selected', async () => {
//     const { getByTestId, getByText, store } = renderWithReduxRouter(<Guessing stage={stage} />);
//     const correctAnswer = await waitForElement(() => getByText("Chair", { selector: 'button' }));

//     await act(async () => {
//         fireEvent.click(correctAnswer);
//     });

//     // expect(null).toMatchSnapshot();
//     const nextButton = await waitForElement(() => getByTestId('guess-next-button'));
//     expect(nextButton).toBeTruthy();
//     // expect(getByText(/Click me/i).closest('button')).toHaveAttribute('disabled');

// })