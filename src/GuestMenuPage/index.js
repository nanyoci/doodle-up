import React from 'react';
import { Link } from "react-router-dom";

import Page from '../Page';

export default function GuestMenuPage() {
	return (
		<Page isMain={true}>
			<h1>Welcome to DoodleUp!</h1>
			<div className="menu-buttons">
			<Link to="/log-in" className="btn btn-primary">Log In</Link>
				<Link to="/sign-up" className="btn btn-light">Sign Up</Link>
			</div>
		</Page>
	)
}
