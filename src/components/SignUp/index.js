import React, { Component } from 'react';
import { FirebaseContext } from '../Firebase';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <FirebaseContext.Consumer>
      {firebase => <SignUpForm firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);
const INITIAL_STATE = { 
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
      super(props);
      this.state = { ...INITIAL_STATE };
  }
  onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    console.log(email, passwordOne, 'credentials');
    event.preventDefault();
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
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
      <input
        name="username"
        value={username}
        onChange={this.onChange}
        type="text"
        placeholder="Username"
      />
      <input
        name="email"
        value={email}
        onChange={this.onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={this.onChange}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={this.onChange}
        type="password"
        placeholder="Confirm Password"
      />
      <button type="submit">Sign Up</button>
      
      {error && <p>{error.message}</p>}
    </form>
    );
  }
}
export default SignUpPage;
export { SignUpPage, SignUpForm };