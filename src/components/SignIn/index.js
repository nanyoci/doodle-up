import React, { useState } from 'react';
import useSound from 'use-sound';
import { connect } from 'react-redux';
import { authenticateLogin, selectError } from './../../redux/ducks/auth';
import { Link } from 'react-router-dom';

import './index.css';

import Page from '../Page';
import buttonClickSound from '../../assets/soundFX/buttonClick.mp3';

function SignInPage({ authenticateLogin, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <Page isMain={true} isNotLoggedIn={true}>
      <div className="auth-container">
        <h1>Sign In</h1>
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="fill-in-form">
            <div className="fill-in">
              <h2 className="fill-name">Username</h2>
              <input
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
                  <p className="auth-error">{error}</p>
                  <br />
                </div>}
            </div>
            <div className=" menu-buttons">
              <button type="submit" className="btn btn-primary">Sign In</button>
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
  error: selectError(state),
});

const dispatchers = {
  authenticateLogin,
};

export default connect(mapStateToProps, dispatchers)(SignInPage);
