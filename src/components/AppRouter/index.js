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

import { selectAuthUser } from './../../redux/ducks/auth';


/** This component handles the routing for the app */
class AppRouter extends Component {
    // componentDidMount() {
    //     const {
    //         username
    //     } = this.props;
    // }

    render() {
        const {
            username
        } = this.props;

        let routes = [
            <Route path="/" exact component={MenuPage} />,
            <Route path="/:username/stories" exact component={StorySelection} />,
            <Route path="/:username/my-story-books" component={MyStoryBooksPage} />,
            <Route path="/:username/drawing" component={Draw} />,
            <Route path="/:username/guessing" component={Guessing} />,
            <Route path="/:username/story-page" component={StoryPage} />,
            <Route path="/:username/forgetpassword" component={ForgetPasswordPage} />,
            <Redirect key="SignInRedirect" from="/signin" exact to="/" />,
            <Redirect key="SignUpRedirect" from="/signup" exact to="/" />
        ];

        if (username == null) {
            routes = [
                <Route path="/signin" component={SignInPage} />,
                <Route path="/signup" component={SignUpPage} />,
                <Route path="/guest" exact component={GuestMenuPage} />,
                <Redirect key="LoginRedirect" from="/" exact to="/guest" />,
            ]
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
    username: selectAuthUser(state),
});

const dispatchers = {
    // refreshTokenLogin,
};

export default connect(mapStateToProps, dispatchers)(AppRouter);