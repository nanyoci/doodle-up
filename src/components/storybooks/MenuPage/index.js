import React from 'react';
import { Link } from "react-router-dom";

import "./index.css";
import Page from '../../common/Page';

function MenuPage() {
	return (
		<Page isMain={true}>
			<h1>Welcome!</h1>
			<div className="menu-buttons">
				<Link to='/stories' className="btn btn-primary">Start Reading</Link>
			</div>
		</Page>
	)
}

export default MenuPage;
