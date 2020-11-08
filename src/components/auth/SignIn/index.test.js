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

    const { getByTestId, store } = renderWithReduxRouter(<LoginPage />);
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

    // post request to backend is made
    expect(axiosMock.post).toHaveBeenCalledTimes(1)
    // error state is null
    expect(store.getState().authReducer.error).toEqual('')
    // no error message displayed
    expect(() => getByTestId("auth-error-signin")).toThrow('Unable to find an element by: [data-testid="auth-error-signin"]');
    expect(localStorage.getItem('username')).toEqual(dummyResponse);
})

it('reject user login with wrong password', async () => {
    axiosMock.post.mockRejectedValueOnce();
    const expected_error_message = "Email and password do not match"

    const { getByTestId, store } = renderWithReduxRouter(<LoginPage />);

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

    // post request to backend for authentication
    expect(axiosMock.post).toHaveBeenCalledTimes(1)
    // error state is updated
    expect(store.getState().authReducer.error).toEqual(expected_error_message)
    // error message is displayed on the page
    const err = await waitForElement(() => getByTestId("auth-error-signin"));
    expect(err.textContent).toEqual(expected_error_message)
    // no username stored in localStorage
    expect(localStorage.getItem('username')).toEqual(null)
})