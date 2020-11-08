import React from 'react'
import { cleanup, fireEvent, waitForElement, act, screen } from '@testing-library/react'

import Guessing from './index.js';
import fakeImage from './../../../assets/drawing-sample.png';
import { renderWithReduxRouter } from './../../../utils/tests';

jest.mock('axios');


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
    options: {
        "Bear": "https://firebasestorage.googleapis.com/v0/b/doodleup-f1847.appspot.com/o/Content%2F001%2Fbear.mp3?alt=media",
        "Bed": "https://firebasestorage.googleapis.com/v0/b/doodleup-f1847.appspot.com/o/Content%2F001%2Fbed.mp3?alt=media",
        "Chair": "https://firebasestorage.googleapis.com/v0/b/doodleup-f1847.appspot.com/o/Content%2F001%2Fchair.mp3?alt=media",
        "Porridge": "https://firebasestorage.googleapis.com/v0/b/doodleup-f1847.appspot.com/o/Content%2F001%2Fporridge.mp3?alt=media"
    },
    answer: "Chair",
    image: fakeImage,
}

it('should take a snapshot', async () => {
    let asFragment = {};
    await act(async () => { ({ asFragment } = renderWithReduxRouter(<Guessing stage={stage} />)) });
    expect(asFragment()).toMatchSnapshot();
})

it('displays correct ui after correct answer is selected', async () => {
    const { getByTestId, getByText } = renderWithReduxRouter(<Guessing stage={stage} test={true} />);
    const correctAnswer = await waitForElement(() => getByText("Chair", { selector: 'button' }));

    // console.error = jest.fn()

    await act(async () => {
        fireEvent.click(correctAnswer);
    });

    const option1 = await waitForElement(() => getByText("Bear", { selector: 'button' }));
    const option2 = await waitForElement(() => getByText("Bed", { selector: 'button' }));
    const option3 = await waitForElement(() => getByText("Chair", { selector: 'button' }));
    const option4 = await waitForElement(() => getByText("Porridge", { selector: 'button' }));
    expect(option1).toBeDisabled();
    expect(option2).toBeDisabled();
    expect(option3).toBeDisabled();
    expect(option4).toBeDisabled();

    const nextButton = await waitForElement(() => getByTestId('next-button'));
    expect(nextButton).toBeTruthy();
})

it('displays correct ui after inccorect answer is selected', async () => {
    const { getByTestId, getByText } = renderWithReduxRouter(<Guessing stage={stage} />);
    const incorrectAnswer = await waitForElement(() => getByText("Bear", { selector: 'button' }));

    await act(async () => {
        fireEvent.click(incorrectAnswer);
    });

    const option1 = await waitForElement(() => getByText("Bear", { selector: 'button' }));
    const option2 = await waitForElement(() => getByText("Bed", { selector: 'button' }));
    const option3 = await waitForElement(() => getByText("Chair", { selector: 'button' }));
    const option4 = await waitForElement(() => getByText("Porridge", { selector: 'button' }));
    expect(option1).toBeDisabled();
    expect(option2).not.toBeDisabled();
    expect(option3).not.toBeDisabled();
    expect(option4).not.toBeDisabled();

    expect(() => getByTestId("next-button")).toThrow('Unable to find an element by: [data-testid="next-button"]');
})