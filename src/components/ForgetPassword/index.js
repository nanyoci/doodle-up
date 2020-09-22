import React, { Component } from 'react';
import { FirebaseContext } from '../Firebase';

const ForgetPasswordPage = () => (
  <div>
    <h1>Forget Password</h1>
    <FirebaseContext.Consumer>
      {firebase => <ForgetPasswordForm firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);
const INITIAL_STATE = { 
  // username: '',
  email: '',
  error: null,
};

class ForgetPasswordForm extends Component {
  constructor(props) {
      super(props);
      this.state = { ...INITIAL_STATE };
  }
  onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { email } = this.state;
    console.log(email, 'credentials');
    event.preventDefault();
    this.props.firebase
      .doResetPassword(email)
      .then(() => {
        alert("Account successfully resetted.");
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
      email,
      error,
    } = this.state;
    return (
    <form onSubmit={this.onSubmit}>
      <input
        name="email"
        value={email}
        onChange={this.onChange}
        type="text"
        placeholder="Email Address"
      />
      <button type="submit">Reset Password</button>
  
      {error && <p>{error.message}</p>}
    </form>
    );
  }
}
export default ForgetPasswordPage;
export { ForgetPasswordPage, ForgetPasswordForm };