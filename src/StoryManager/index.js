import React, { Component } from 'react';

import DrawingGame from '../draw';
import StoryPage from '../StoryPage';

const MODES = {
	GUESSING: 0,
	DRAWING: 1,
	STORY: 2,
}

export default class StoryManager extends Component {
	state = {
		currentPage: 0,
		mode: MODES.DRAWING,
		drawings: {},
	}

	handleCompleteDrawing = drawing => {
		const {
			currentPage,
			drawings,
		} = this.state;

		this.setState({
			drawings: {
				...drawings,
				[currentPage]: drawing,
			},
			mode: MODES.STORY,
		})
	}

	render() {
		const {
			mode,
			drawings,
			currentPage,
		} = this.state;

		switch (mode) {
			case MODES.GUESSING:
				return <p>Guessing Game</p>;
			
			case MODES.DRAWING:
				return (
					<DrawingGame
						onCompleteDrawing={this.handleCompleteDrawing}
					/>
				);
			
			case MODES.STORY:
				return (
					<StoryPage
						drawing={drawings[currentPage]}
					/>
				);
					
			default:
				break;
		}
	}
}
