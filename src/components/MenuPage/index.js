import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { selectUsername } from './../../redux/ducks/auth';

import "./index.css";
import Page from '../Page';

function MenuPage({ username }) {
	// const name = "Jasmine";
	// const username = props.match.params.username

	return (
		<Page isMain={true}>
			<h1>Hello {username}!</h1>
			<div className="menu-buttons">
				<Link to={`/${username}/stories`} className="btn btn-primary">Start</Link>
				<Link to={`/${username}/my-story-books`} className="btn btn-light">My Story Books</Link>
			</div>
		</Page>
	)
}

const mapStateToProps = state => ({
	username: selectUsername(state),
});

export default connect(mapStateToProps,)(MenuPage);
