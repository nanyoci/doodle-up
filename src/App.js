import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


// import './App.css';

import Draw from './draw';
import Guessing from './guessing';
import StoryManager from './StoryManager';
import StorySelection from './StorySelection';
import MenuPage from './MenuPage';
import MyStoryBooksPage from './MyStoryBooksPage';
import StoryPage from './StoryPage';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={MenuPage} />
				<Route path="/stories" exact component={StorySelection} />
				<Route path="/my-story-books" component={MyStoryBooksPage} />
				<Route path="/drawing" component={Draw} />
				<Route path="/guessing" component={Guessing} />
				<Route path="/story-page" component={StoryPage} />
			</Switch>
		</Router>
	);
}

export default App;
