import React from 'react';
import { Link } from "react-router-dom";

import rabbit from '../assets/rabbit.png';
import dinosaur from '../assets/dinosaur.png';
import car from '../assets/car.png';
import './index.css';
import Page from '../Page';

export default function StorySelection() {
	return (
		<Page>
			<h1>Choose a story!</h1>
			<div className="story-boxes">
				<Link className="story-box" to="/guessing">
					<img src={rabbit} alt="Rabbit story" />
				</Link>
				<Link className="story-box" to="/drawing">
					<img src={dinosaur} alt="Dinosaur story" />
				</Link>
				<Link className="story-box" to="/story-page">
					<img src={car} alt="Car story" />
				</Link>
			</div>
		</Page>
	)
}
