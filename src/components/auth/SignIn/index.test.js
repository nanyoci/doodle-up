import React from 'react'
import { cleanup, fireEvent, waitForElement, act } from '@testing-library/react'
import axiosMock from 'axios';

import LoginPage from './index.js';
import { renderWithReduxRouter } from './../../../utils/tests';

jest.mock('axios');

beforeEach(() => {
    window.HTMLMediaElement.prototype.load = () => { /* do nothing */ };
    window.HTMLMediaElement.prototype.play = () => { /* do nothing */ };
    window.HTMLMediaElement.prototype.pause = () => { /* do nothing */ };
    window.HTMLMediaElement.prototype.addTextTrack = () => { /* do nothing */ };
    localStorage.removeItem('username');
})

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

it('should take a snapshot', async () => {
    let asFragment = {};
    await act(async () => { ({ asFragment } = renderWithReduxRouter(<LoginPage />)) });
    expect(asFragment()).toMatchSnapshot();
})

it('allows the user to login successfully', async () => {
    const dummyResponse = "DoodleUp"

    axiosMock.post.mockResolvedValueOnce({
        "data": dummyResponse
    });

    const { getByTestId } = renderWithReduxRouter(<LoginPage />);
    const emailField = await waitForElement(() => getByTestId("emailField"));
    const passwordField = await waitForElement(() => getByTestId("passwordField"));
    const loginButton = await waitForElement(() => getByTestId("loginButton"));

    await act(async () => {
        fireEvent.change(emailField, {
            target: { value: 'doodleup@test.com' },
        })
        fireEvent.change(passwordField, {
            target: { value: 'doodleup1234' },
        })
    });

    await act(async () => {
        fireEvent.click(loginButton)
    });

    expect(localStorage.getItem('username')).toEqual(dummyResponse);
})

it('reject user login with wrong password', async () => {
    axiosMock.post.mockRejectedValueOnce();

    const { getByTestId } = renderWithReduxRouter(<LoginPage />);

    const emailField = await waitForElement(() => getByTestId("emailField"));
    const passwordField = await waitForElement(() => getByTestId("passwordField"));
    const loginButton = await waitForElement(() => getByTestId("loginButton"));

    await act(async () => {
        fireEvent.change(emailField, {
            target: { value: 'doodleup@test.com' },
        })
        fireEvent.change(passwordField, {
            target: { value: 'wrong password' },
        })
    });

    await act(async () => {
        fireEvent.click(loginButton)
    });
    expect(localStorage.getItem('username')).toEqual(null)
})