import React, { Component } from 'react';
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
const INITIAL_STATE = {
  // username: '',
  email: '',
  password: '',
  error: null,
};


class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  xs


  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    // const { email, password } = this.state;
    // console.log(email, 'credentials');
    // event.preventDefault();
    // this.props.firebase
    //   .doSignInWithEmailAndPassword(email, password)
    //   .then(() => {
    //     alert("Account successfully logged in.");
    //     // this.props.history.push('/components/signup');
    //   })
    //   // .then(authUser => {
    //   //   this.setState({ ...INITIAL_STATE });
    //   // })
    //   .then(response => console.log(response))
    //   .catch(error => {
    //     this.setState({ error });
    //   });
    event.preventDefault();
    // this.playMouseClickSound()

  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;
    return (
      <Page isMain={true}>
        <h1>Sign In</h1>
        <form className="auth-form" onSubmit={this.onSubmit}>
          <div className="fill-in-form">
            <div className="fill-in">
              <h2 className="fill-name">Username</h2>
              <input
                className="input"
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
              />
            </div>
            <div className="fill-in">
              <h2 className="fill-name">Password</h2>
              <input
                className="input"
                name="password"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="fill-in menu-buttons">
              <button type="submit" className="btn btn-primary">Sign In</button>
            </div>

            {error && <p>{error.message}</p>}
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
}
export default SignInPage;
export { SignInPage, SignInForm };