import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { authenticateLogin, selectAuthError, selectAuthLoading, authInit } from '../../../redux/ducks/auth';


import './index.css';

import Page from '../../common/Page';
import buttonClickSound from '../../../assets/soundFX/buttonClick.mp3';

function SignInPage({ authenticateLogin, error, isLoading, authInit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    authInit()
  }, [authInit]);

  const [playMouseClickSound] = useSound(
    buttonClickSound,
    {
      volume: 0.5
    }
  )
  const onSubmit = e => {
    e.preventDefault();
    playMouseClickSound()
    authenticateLogin({ email, password })
  }

  return (
    <Page isMain={true} isNotLoggedIn={true} isLoading={isLoading} >
      <div className="auth-container">
        <h1>Sign In</h1>
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="fill-in-form">
            <div className="fill-in">
              <h2 className="fill-name">Email</h2>
              <input
                data-testid="emailField"
                className="input"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="text"
                placeholder="Email Address"
              />
            </div>
            <div className="fill-in">
              <h2 className="fill-name">Password</h2>
              <input
                data-testid="passwordField"
                className="input"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="menu-buttons">
              {error &&
                <div>
                  <p data-testid="auth-error-signin" className="auth-error">{error}</p>
                  <br />
                </div>}
            </div>
            <div className=" menu-buttons">
              <button data-testid="loginButton" id="loginButton" type="submit" className="btn btn-primary">Sign In</button>
            </div>
          </div>
        </form>
        <br />
        <Link className="auth-link" to="signup">Create an account? Sign up</Link>
      </div>
    </Page>
  );

}

const mapStateToProps = state => ({
  error: selectAuthError(state),
  isLoading: selectAuthLoading(state),
});

const dispatchers = {
  authenticateLogin,
  authInit
};

export default connect(mapStateToProps, dispatchers)(SignInPage);
