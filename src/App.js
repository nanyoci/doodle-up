import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUpPage, { SignUpForm } from './components/SignUp';
import SignInPage, { SignInForm } from './components/SignIn';
import ForgetPasswordPage, { ForgetPasswordForm } from './components/ForgetPassword';
import ChangePasswordPage, { ChangePasswordForm } from './components/ChangePassword';
import SignOutButton from './components/SignOut';
import { FirebaseContext } from './components/Firebase';

// import './App.css';

import Draw from './draw';
import Guessing from './guessing';
import StorySelection from './StorySelection';
import MenuPage from './MenuPage';
import MyStoryBooksPage from './MyStoryBooksPage';
import StoryPage from './StoryPage';
import GuestMenuPage from './GuestMenuPage';

function App() {
	// The links below are for testing
	return (
		<Router>
			<Switch>
				<Route path="/guest" exact component={GuestMenuPage} />
				<Route path="/" exact component={MenuPage} />
				<Route path="/stories" exact component={StorySelection} />
				<Route path="/my-story-books" component={MyStoryBooksPage} />
				<Route path="/drawing" component={Draw} />
				<Route path="/guessing" component={Guessing} />
				<Route path="/story-page" component={StoryPage} />
				<Route path="/components/signin" component={SignInPage} />
				<Route path="/components/signup" component={SignUpPage} />
				<Route path="/components/forgetpassword" component={ForgetPasswordPage} />
				<Route path="/components/changepassword" component={ChangePasswordPage} />
			</Switch>
		</Router>
	);
}

export default App;
