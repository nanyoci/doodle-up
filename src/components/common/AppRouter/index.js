import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import StorySelection from '../../storybooks/StorySelection';
import MenuPage from '../../storybooks/MenuPage';
import StoryManager from '../../storybooks/StoryManager';


/** This component handles the routing for the app */
const AppRouter = () => {
    let routes = [
        <Route key="menu" path="/" exact component={MenuPage} />,
        <Route key="story-selection" path="/stories" exact component={StorySelection} />,
        <Route key="story-manager" path="/stories/:id" component={StoryManager} />,
        <Redirect key="sign-in-redirect" from="/signin" exact to="/" />,
        <Redirect key="sign-up-redirect" from="/signup" exact to="/" />
    ];

    return (
        <BrowserRouter>
            <Switch>
                {routes}
            </Switch>
        </BrowserRouter>
    );
}

export default AppRouter;