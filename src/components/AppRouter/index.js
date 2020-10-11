import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import StorySelection from '../StorySelection';
import MenuPage from '../MenuPage';
import MyStoryBooksPage from '../MyStoryBooksPage';
import GuestMenuPage from '../GuestMenuPage';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import StoryManager from '../StoryManager';

import { selectAuthUser } from './../../redux/ducks/auth';


/** This component handles the routing for the app */
const AppRouter = props => {
     const {
            username
        } = props;

    let routes = [
        <Route key="menu" path="/" exact component={MenuPage} />,
        <Route key="story-selection" path="/stories" exact component={StorySelection} />,
        <Route key="my-story-books" path="/my-story-books" exact component={MyStoryBooksPage} />,
        <Route key="story-manager" path="/stories/:id" component={props => <StoryManager isReadOnly={false} {...props} />} />,
        <Route key="completed-story-manager" path="/my-story-books/:id" component={props => <StoryManager isReadOnly={true} {...props} />} />,
        // <Route path="/drawing" component={Draw} />,
        // <Route path="/guessing" component={Guessing} />,
        // <Route path="/story-page" component={StoryPage} />,
        // <Route path="/forgetpassword" component={ForgetPasswordPage} />,
        <Redirect key="sign-in-redirect" from="/signin" exact to="/" />,
        <Redirect key="sign-up-redirect" from="/signup" exact to="/" />
    ];

    if (username == null) {
        routes = [
            <Route key="sign-in" path="/signin" component={SignInPage} />,
            <Route key="sign-up" path="/signup" component={SignUpPage} />,
            <Route key="guest" path="/guest" exact component={GuestMenuPage} />,
            <Redirect key="sign-in-redirect" from="/" to="/guest" />,
        ]
    }

    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
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