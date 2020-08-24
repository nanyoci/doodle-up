import React from 'react';

import doodleUp from '../assets/doodle-up.png';
import rabbit from '../assets/rabbit.png';
import dinosaur from '../assets/dinosaur.png';
import car from '../assets/car.png';
import './index.css';

export default function StoryMenu() {
	return (
		<div className="menu-container">
			<img className="logo" src={doodleUp} alt="DoodleUp" />
			<h2>Choose a story!</h2>
			<div className="story-boxes">
				<a className="story-box" href="/">
					<img src={rabbit} alt="Rabbit story" />
				</a>
				<a className="story-box" href="/">
					<img src={dinosaur} alt="Dinosaur story" />
				</a>
				<a className="story-box" href="/">
					<img src={car} alt="Car story" />
				</a>
			</div>
		</div>
	)
}
