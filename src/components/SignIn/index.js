import React, { useState } from 'react';
import useSound from 'use-sound';

import './index.css';

import { FirebaseContext } from '../Firebase';
import Page from '../Page';
import mouseClickSound from '../../assets/soundFX/mouseClick.mp3';

const SignInPage = () => (
  <FirebaseContext.Consumer>
    {firebase => <SignInForm firebase={firebase} />}
  </FirebaseContext.Consumer>
);

function SignInForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [playMouseClickSound] = useSound(
    mouseClickSound,
    {
      volume: 0.5
    }
  )
  const onSubmit = event => {
    event.preventDefault();
    playMouseClickSound()
    console.log(email, 'credentials');
    event.preventDefault();
    props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        alert("Account successfully logged in.");
        // this.props.history.push('/components/signup');
      })
      // .then(authUser => {
      //   this.setState({ ...INITIAL_STATE });
      // })
      .then(response => console.log(response))
      .catch(error => {
        setError(error);
      });



  }

  return (
    <Page isMain={true}>
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
          <div className="fill-in menu-buttons">
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
    </Page>
  );

}
export default SignInPage;
export { SignInPage, SignInForm };