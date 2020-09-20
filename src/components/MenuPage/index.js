import React from 'react';
import { Link } from "react-router-dom";

import "./index.css";
import Page from '../Page';

export default function MenuPage() {
	const name = "Jasmine";

	return (
		<Page isMain={true}>
			<h1>Hello {name}!</h1>
			<div className="menu-buttons">
				<Link to="/stories" className="btn btn-primary">Start</Link>
				<Link to="/my-story-books" className="btn btn-light">My Story Books</Link>
			</div>
		</Page>
	)
}
