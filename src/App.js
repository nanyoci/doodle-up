import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Draw from './components/Draw';
import Guessing from './components/Guessing';
import StorySelection from './components/StorySelection';
import MenuPage from './components/MenuPage';
import MyStoryBooksPage from './components/MyStoryBooksPage';
import StoryPage from './components/StoryPage';
import GuestMenuPage from './components/GuestMenuPage';
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';
import ForgetPasswordPage from './components/ForgetPassword';
// import ChangePasswordPage from './components/ChangePassword';
// import SignOutButton from './components/SignOut';

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
				{/* <Route path="/components/changepassword" component={ChangePasswordPage} /> */}
			</Switch>
		</Router>
	);
}

export default App;
