import React, { Component } from 'react';
import { FirebaseContext } from '../Firebase';

const ChangePasswordPage = () => (
  <div>
    <h1>Change Password</h1>
    <FirebaseContext.Consumer>
      {firebase => <ChangePasswordForm firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);
const INITIAL_STATE = { 
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class ChangePasswordForm extends Component {
  constructor(props) {
      super(props);
      this.state = { ...INITIAL_STATE };
  }
  onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { passwordOne } = this.state;
    event.preventDefault();
    this.props.firebase
      .doChangePassword(passwordOne)
      .then(() => {
        alert("Password successfully changed.");
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
      passwordOne,
      passwordTwo,
      error,
    } = this.state;
    return (
    <form onSubmit={this.onSubmit}>
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={this.onChange}
        type="password"
        placeholder="New Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={this.onChange}
        type="password"
        placeholder="Confirm New Password"
      />
      <button type="submit">Change Password</button>
  
      {error && <p>{error.message}</p>}
    </form>
    );
  }
}
export default ChangePasswordPage;
export { ChangePasswordPage, ChangePasswordForm };