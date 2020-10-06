import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import { connect } from 'react-redux';
import { authenticateSignUp, selectAuthError, authInit } from './../../redux/ducks/auth';
import { Link } from 'react-router-dom';

import './index.css';

import Page from '../Page';
import buttonClickSound from '../../assets/soundFX/buttonClick.mp3';
import splatBlue from '../../assets/splat-blue.png';
import paint from '../../assets/paint.svg';



function SignUpPage({ authenticateSignUp, error, authInit }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");

  useEffect(() => {
    authInit()
  }, [])

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
    <>
      <Page isMain={false} isNotLoggedIn={true}>
        <div className="auth-container">
          <h1>Sign Up</h1>
          <form className="auth-form" onSubmit={onSubmit}>
            <div className="fill-in-form">
              <div className="fill-in">
                <div className="fill-name-container">
                  <h2 className="fill-name">Username</h2>
                </div>
                <div className="input-container">
                  <input name="username"
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
                    className="input"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="text"
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
                    className="input"
                    name="passwordOne"
                    value={passwordOne}
                    onChange={e => setPasswordOne(e.target.value)}
                    type="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="fill-in">
                <div className="fill-name-container">
                  <h2 className="fill-name">Confirm Password</h2>
                </div>
                <div className="input-container">
                  <input
                    className="input"
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={e => setPasswordTwo(e.target.value)}
                    type="password"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              <div className="menu-buttons">
                {error &&
                  <div>
                    <p className="auth-error">{error}</p>
                    <br />
                  </div>}
              </div>
              <div className="menu-buttons">
                <button type="submit" className="btn btn-primary">Sign Up</button>
              </div>
            </div>
          </form>
          <br />
          <Link className="auth-link" to="/signin">Already have an account? Sign in</Link>
        </div>
      </Page>
      <img className="splat-blue-corner" src={splatBlue} alt="Pink splat of paint" />
      <img className="paint-corner" src={paint} alt="Paint brush and palette" />
    </>
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