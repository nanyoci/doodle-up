import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from '../AppRouter';
import store from './../../redux/store'

/** This component is the entrypoint of the react app */
function App() {
	return (
		<Provider store={store}>
			<AppRouter />
		</Provider>
	);
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import Draw from '../Draw';
// import Guessing from '../Guessing';
// import StorySelection from '../StorySelection';
// import MenuPage from '../MenuPage';
// import MyStoryBooksPage from '../MyStoryBooksPage';
// import StoryPage from '../StoryPage';
// import GuestMenuPage from '../GuestMenuPage';
// import SignUpPage from '../SignUp';
// import SignInPage from '../SignIn';
// import ForgetPasswordPage from '../ForgetPassword';
// // import ChangePasswordPage from '../ChangePassword';
// // import SignOutButton from '../SignOut';

// function App() {
// 	// The links below are for testing
// 	return (
// 		<Router>
// 			<Switch>
// 				<Route path="/guest" exact component={GuestMenuPage} />
// 				<Route path="/" exact component={MenuPage} />
// 				<Route path="/stories" exact component={StorySelection} />
// 				<Route path="/my-story-books" component={MyStoryBooksPage} />
// 				<Route path="/drawing" component={Draw} />
// 				<Route path="/guessing" component={Guessing} />
// 				<Route path="/story-page" component={StoryPage} />
// 				<Route path="/components/signin" component={SignInPage} />
// 				<Route path="/components/signup" component={SignUpPage} />
// 				<Route path="/components/forgetpassword" component={ForgetPasswordPage} />
// 				{/* <Route path="/components/changepassword" component={ChangePasswordPage} /> */}
// 			</Switch>
// 		</Router>
// 	);
// }

// export default App;
