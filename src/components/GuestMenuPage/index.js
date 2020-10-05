import React from 'react';
import { Link } from "react-router-dom";

import Page from '../Page';

export default function GuestMenuPage() {
	return (
		<Page isMain={true}>
			<h1>Welcome to DoodleUp!</h1>
			<div className="menu-buttons">
				<Link to="/signin" className="btn btn-primary">Sign In</Link>
				<Link to="/signup" className="btn btn-light">Sign Up</Link>
			</div>
		</Page>
	)
}
