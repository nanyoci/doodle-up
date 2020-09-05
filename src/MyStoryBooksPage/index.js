import React from 'react';

import rabbit from '../assets/rabbit.png';
import dinosaur from '../assets/dinosaur.png';
import car from '../assets/car.png';
import Page from '../Page';

export default function MyStoryBooksPage() {
	return (
		<Page>
			<h1>My Story Books</h1>
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
		</Page>
	)
}
