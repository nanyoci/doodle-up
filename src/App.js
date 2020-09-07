import React from 'react';

import './App.css';

import Draw from './draw';
import SignUpPage, { SignUpForm } from './components/SignUp';
import SignInPage, { SignInForm } from './components/SignIn';
import SignOutButton from './components/SignOut';
import { FirebaseContext } from './components/Firebase';

import {
  BrowserRouter as Router,
  withRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {


  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/draw">Draw</Link>
          </li>
          <li>
            <Link to="/components/signup">Sign up</Link>
          </li>
          <li>
            <Link to="/components/signin">Sign in</Link>
          </li>
          <li>
          <FirebaseContext.Consumer>
            {firebase => <SignOutButton firebase={firebase} />}
          </FirebaseContext.Consumer>
          </li>
        </ul>
      </nav>
      <Switch>
      <Route path="/components/signin" component={withRouter(SignInPage)} />
        <Route path="/components/signup" component={withRouter(SignUpPage)} />
        <Route path="/draw" component={withRouter(Draw)} >
        </Route>
      </Switch>
    </Router>
    // <SignUp />
  //  <Draw/>
  );
}

export default App;
