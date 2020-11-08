import React from 'react'
import { cleanup, fireEvent, waitForElement, act } from '@testing-library/react'
import axiosMock from 'axios';

import SignUpPage from './index.js';
import { renderWithReduxRouter } from './../../../utils/tests';
import { errorAction } from './../../../redux/ducks/auth';

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
    await act(async () => { ({ asFragment } = renderWithReduxRouter(<SignUpPage />)) });
    expect(asFragment()).toMatchSnapshot();
})


it('allows the user to register successfully', async () => {
    const dummyResponse = "User created."
    const username = "DoodleUp"

    axiosMock.post.mockResolvedValueOnce({
        "data": dummyResponse
    });

    const { getByTestId, store } = renderWithReduxRouter(<SignUpPage />);
    const emailField = await waitForElement(() => getByTestId("emailField"));
    const usernameField = await waitForElement(() => getByTestId("usernameField"));
    const passwordOneField = await waitForElement(() => getByTestId("passwordOneField"));
    const passwordTwoField = await waitForElement(() => getByTestId("passwordTwoField"));
    const registerButton = await waitForElement(() => getByTestId("signUpButton"));

    await act(async () => {
        fireEvent.change(emailField, {
            target: { value: 'doodleup@test.com' },
        })
        fireEvent.change(usernameField, {
            target: { value: "DoodleUp" },
        })
        fireEvent.change(passwordOneField, {
            target: { value: 'doodleup1234' },
        })
        fireEvent.change(passwordTwoField, {
            target: { value: 'doodleup1234' },
        })
    });

    await act(async () => {
        fireEvent.click(registerButton);
    });

    // post request to backend is made
    expect(axiosMock.post).toHaveBeenCalledTimes(1)
    // error state is null
    expect(store.getState().authReducer.error).toEqual('')
    // no error message displayed
    expect(() => getByTestId("auth-error-signup")).toThrow('Unable to find an element by: [data-testid="auth-error-signup"]');
    expect(localStorage.getItem('username')).toEqual(username);

})

it('reject user register when passwords do not matched', async () => {
    const username = "DoodleUp"

    const { getByTestId, store } = renderWithReduxRouter(<SignUpPage />);
    const emailField = await waitForElement(() => getByTestId("emailField"));
    const usernameField = await waitForElement(() => getByTestId("usernameField"));
    const passwordOneField = await waitForElement(() => getByTestId("passwordOneField"));
    const passwordTwoField = await waitForElement(() => getByTestId("passwordTwoField"));
    const registerButton = await waitForElement(() => getByTestId("signUpButton"));

    await act(async () => {
        fireEvent.change(emailField, {
            target: { value: 'doodleup@test.com' },
        })
        fireEvent.change(usernameField, {
            target: { value: username },
        })
        fireEvent.change(passwordOneField, {
            target: { value: 'doodleup1234' },
        })
        fireEvent.change(passwordTwoField, {
            target: { value: ' mismatched passwods' },
        })
    });

    await act(async () => {
        fireEvent.click(registerButton);
    });

    // post request is not called because passwords do not match
    expect(axiosMock.post).toHaveBeenCalledTimes(0)
    // error state is updated
    expect(store.getState().authReducer.error).toEqual('Passwords do not match')
    // error message is displayed on the page
    const err = await waitForElement(() => getByTestId("auth-error-signup"));
    expect(err.textContent).toEqual("Passwords do not match")

    expect(localStorage.getItem('username')).toEqual(null)
})


it('reject user register when email is taken', async () => {
    const expected_error = "The email is already in use"
    const username = "DoodleUp"

    axiosMock.post.mockResolvedValueOnce({
        "data": expected_error
    });

    const { getByTestId, store } = renderWithReduxRouter(<SignUpPage />);
    const emailField = await waitForElement(() => getByTestId("emailField"));
    const usernameField = await waitForElement(() => getByTestId("usernameField"));
    const passwordOneField = await waitForElement(() => getByTestId("passwordOneField"));
    const passwordTwoField = await waitForElement(() => getByTestId("passwordTwoField"));
    const registerButton = await waitForElement(() => getByTestId("signUpButton"));
    await act(async () => {
        fireEvent.change(emailField, {
            target: { value: 'doodleup@test.com' },
        })
        fireEvent.change(usernameField, {
            target: { value: username },
        })
        fireEvent.change(passwordOneField, {
            target: { value: 'doodleup1234' },
        })
        fireEvent.change(passwordTwoField, {
            target: { value: 'doodleup1234' },
        })
    });
    await act(async () => {
        fireEvent.click(registerButton)
    });

    // post request to backend is made
    expect(axiosMock.post).toHaveBeenCalledTimes(1)
    // error state is updated
    expect(store.getState().authReducer.error).toEqual(expected_error)
    // error message is displayed on the page
    const err = await waitForElement(() => getByTestId("auth-error-signup"));
    expect(err.textContent).toEqual(expected_error)
    // no username stored in localStorage
    expect(localStorage.getItem('username')).toEqual(null);

})