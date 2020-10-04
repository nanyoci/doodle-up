import React, { useState } from 'react';
import useSound from 'use-sound';
import { connect } from 'react-redux';
import { authenticateLogin } from './../../redux/ducks/auth';
import { Link } from 'react-router-dom';

import './index.css';

import Page from '../Page';
import buttonClickSound from '../../assets/soundFX/buttonClick.mp3';

function SignInPage({ authenticateLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [playMouseClickSound] = useSound(
    buttonClickSound,
    {
      volume: 0.5
    }
  )
  const onSubmit = event => {
    event.preventDefault();
    playMouseClickSound()
    // console.log(email, 'credentials');
    authenticateLogin({ email, password })
    console.log("here")
    // props.firebase
    //   .doSignInWithEmailAndPassword(email, password)
    //   .then(res => {
    //     alert("Account successfully logged in.");
    //     // this.props.history.push('/components/signup');
    //   })
    //   // .then(authUser => {
    //   //   this.setState({ ...INITIAL_STATE });
    //   // })
    //   .then(response => console.log(response))
    //   .catch(error => {
    //     setError(error);
    //   });

  }

  return (
    <Page isMain={true}>
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
              {error && <p>{error.message}</p>}
            </div>
            <div className=" menu-buttons">
              <button type="submit" className="btn btn-primary">Sign In</button>
            </div>
          </div>
          {/* <input
    name="username"
    value={username}
        onChange={this.onChange}
        type="text"
        placeholder="Username"
      /> */}
        </form>
        <br></br>
        <Link id="auth-link" to="/signup">Create an account? Sign up</Link>
      </div>
    </Page>
  );

}

const dispatchers = {
  authenticateLogin,
};

export default connect(() => ({}), dispatchers)(SignInPage);
