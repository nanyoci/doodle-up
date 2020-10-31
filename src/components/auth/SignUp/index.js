import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import { connect } from 'react-redux';
import { authenticateSignUp, selectAuthError, authInit } from '../../../redux/ducks/auth';
import { Link } from 'react-router-dom';

import Page from '../../common/Page';
import buttonClickSound from '../../../assets/soundFX/buttonClick.mp3';

function SignUpPage({ authenticateSignUp, error, authInit }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");

  useEffect(() => {
    authInit()
  }, [authInit])

  const [playMouseClickSound] = useSound(
    buttonClickSound,
    {
      volume: 0.5
    }
  )

  const onSubmit = e => {
    e.preventDefault();
    playMouseClickSound();
    authenticateSignUp({ email, username, passwordOne, passwordTwo })
  }

  return (
    <Page isMain={true} isNotLoggedIn={true}>
      <div className="auth-container">
        <h1>Sign Up</h1>
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="fill-in-form">
            <div className="fill-in">
              <div className="fill-name-container">
                <h2 className="fill-name">Username</h2>
              </div>
              <div className="input-container">
                <input
                  data-testid="usernameField"
                  name="username"
                  className="input"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  type="text"
                  placeholder="Username"
                />
              </div>
            </div>
            <div className="fill-in">
              <div className="fill-name-container">
                <h2 className="fill-name">Email</h2>
              </div>
              <div className="input-container">
                <input
                  data-testid="emailField"
                  className="input"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email Address"
                />
              </div>
            </div>
            <div className="fill-in">
              <div className="fill-name-container">
                <h2 className="fill-name">Password</h2>
              </div>
              <div className="input-container">
                <input
                  data-testid="passwordOneField"
                  className="input"
                  name="passwordOne"
                  value={passwordOne}
                  onChange={e => setPasswordOne(e.target.value)}
                  type="password"
                  placeholder="Password"
                  // autoComplete="new-password"
                  minLength="6"
                />
              </div>
            </div>
            <div className="fill-in">
              <div className="fill-name-container">
                <h2 className="fill-name">Confirm Password</h2>
              </div>
              <div className="input-container">
                <input
                  data-testid="passwordTwoField"
                  className="input"
                  name="passwordTwo"
                  value={passwordTwo}
                  onChange={e => setPasswordTwo(e.target.value)}
                  type="password"
                  placeholder="Confirm Password"
                  // autoComplete="new-password"
                  minLength="6"
                />
              </div>
            </div>
            <div className="menu-buttons">
              {error &&
                <div >
                  <p data-testid="auth-error-signup" className="auth-error">{error}</p>
                  <br />
                </div>}
            </div>
            <div className="menu-buttons">
              <button data-testid="signUpButton" type="submit" className="btn btn-primary">Sign Up</button>
            </div>
          </div>
        </form>
        <br />
        <Link className="auth-link" to="/signin">Already have an account? Sign in</Link>
      </div>
    </Page>

  );

}

const mapStateToProps = state => ({
  error: selectAuthError(state),
});

const dispatchers = {
  authenticateSignUp,
  authInit
};

export default connect(mapStateToProps, dispatchers)(SignUpPage);