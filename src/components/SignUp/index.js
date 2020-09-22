import React, { useState } from 'react';
import { FirebaseContext } from '../Firebase';
import useSound from 'use-sound';

import './index.css';

import Page from '../Page';
import mouseClickSound from '../../assets/soundFX/mouseClick.mp3';
import splatBlue from '../../assets/splat-blue.png';
import paint from '../../assets/paint.svg';

const SignUpPage = () => (
  <FirebaseContext.Consumer>
    {firebase => <SignUpForm firebase={firebase} />}
  </FirebaseContext.Consumer>
);


function SignUpForm(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState(null);

  const [playMouseClickSound] = useSound(
    mouseClickSound,
    {
      volume: 0.5
    }
  )

  const onSubmit = event => {
    event.preventDefault();
    playMouseClickSound();
    console.log(email, passwordOne, 'credentials');
    props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          })
          .then(() => {
            alert("Account successfully created.");
          });
      })
      // .then(authUser => {
      //   setState({ ...INITIAL_STATE });
      // })
      .then(response => console.log(response))
      .catch(error => {
        setError(error);
      });

    event.preventDefault();
  }

  return (
    <>
      <Page isMain={false}>
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
              {error && <p>{error.message}</p>}
            </div>
            <div className="menu-buttons">
              <button type="submit" className="btn btn-primary">Sign Up</button>
            </div>
          </div>
        </form>
      </Page>
      <img className="splat-blue-corner" src={splatBlue} alt="Pink splat of paint" />
      <img className="paint-corner" src={paint} alt="Paint brush and palette" />
    </>
  );

}
export default SignUpPage;
export { SignUpPage, SignUpForm };