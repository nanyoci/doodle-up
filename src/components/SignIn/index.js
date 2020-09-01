import React, { Component } from 'react';
import { FirebaseContext } from '../Firebase';

const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <FirebaseContext.Consumer>
      {firebase => <SignInForm firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
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
  onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { email, password } = this.state;
    console.log(email, 'credentials');
    event.preventDefault();
    this.props.firebase
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
        this.setState({ error });
      });
 
    event.preventDefault();
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
    <form onSubmit={this.onSubmit}>
      {/* <input
        name="username"
        value={username}
        onChange={this.onChange}
        type="text"
        placeholder="Username"
      /> */}
      <input
        name="email"
        value={email}
        onChange={this.onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={passwordOne}
        onChange={this.onChange}
        type="password"
        placeholder="Password"
      />
      <button type="submit">Sign In</button>
  
      {error && <p>{error.message}</p>}
    </form>
    );
  }
}
export default SignInPage;
export { SignInPage, SignInForm };