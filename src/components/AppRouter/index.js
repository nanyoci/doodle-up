import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Draw from '../Draw';
import Guessing from '../Guessing';
import StorySelection from '../StorySelection';
import MenuPage from '../MenuPage';
import MyStoryBooksPage from '../MyStoryBooksPage';
import StoryPage from '../StoryPage';
import GuestMenuPage from '../GuestMenuPage';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import ForgetPasswordPage from '../ForgetPassword';
// import ChangePasswordPage from '../ChangePassword';
// import SignOutButton from '../SignOut';

import { selectUsername } from './../../redux/ducks/auth';


/** This component handles the routing for the app */
class AppRouter extends Component {
    componentDidMount() {
        const {
            username
            // refresh_token,
            // refreshTokenLogin
        } = this.props;

        // if (refresh_token)
        //     refreshTokenLogin(refresh_token);
    }

    render() {
        const {
            username
        } = this.props;

        let routes = [
            <Route path="/guest" exact component={GuestMenuPage} />,
            <Route path="/" exact component={MenuPage} />,
            <Route path="/stories" exact component={StorySelection} />,
            <Route path="/my-story-books" component={MyStoryBooksPage} />,
            <Route path="/drawing" component={Draw} />,
            <Route path="/guessing" component={Guessing} />,
            <Route path="/story-page" component={StoryPage} />,
            <Route path="/forgetpassword" component={ForgetPasswordPage} />,
            <Redirect key="HomeRedirect" from="/signin" exact to="/" />
        ];

        if (username == null) {
            routes = [
                <Route path="/signin" component={SignInPage} />,
                <Route path="/signup" component={SignUpPage} />,
                <Redirect key="LoginRedirect" from="/" exact to="/signin" />
            ]
            console.log("no user")
        }

        return (
            <BrowserRouter>
                {/* <Errors /> */}
                {/* <Header /> */}
                <Switch>
                    {/* <Route
                        path="/not-found"
                        exact
                        component={NotFoundPage}
                    /> */}
                    <Route
                        path="/logout"
                        exact
                        component={SignInPage}
                    />
                    {routes}
                    {/* <Redirect
                        from="/"
                        to="/not-found"
                    /> */}
                </Switch>
                {/* <Footer /> */}
            </BrowserRouter>
        );
    }
}

AppRouter.propTypes = {
    username: PropTypes.string,
    // refreshTokenLogin: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    // userLoading: selectUserLoading(state),
    // userFailed: selectUserFailed(state),
    // user: selectUser(state),
    username: selectUsername(state),
});

const dispatchers = {
    // refreshTokenLogin,
};

export default connect(mapStateToProps, dispatchers)(AppRouter);