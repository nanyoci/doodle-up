import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react'
import { authLogout } from './../../redux/ducks/auth';


import doodleUp from '../../assets/doodle-up.svg';
import book from '../../assets/book.svg';
import paint from '../../assets/paint.svg';
import splatPink from '../../assets/splat-pink.png';
import splatBlue from '../../assets/splat-blue.png';
import loader from '../../assets/loader.gif';
import './index.css';
import { Link } from 'react-router-dom';

class Page extends React.Component {
	constructor() {
		super();
		this.state = {
			isPlaying: true
		}
	}


	toggleIsPlaying = () => {
		this.setState((state) => {
			// console.log("state", state.isPlaying)
			return { isPlaying: !state.isPlaying }
		});

	}

	componentDidMount() {
		const audio = document.querySelector('audio')
		audio.volume = 0.2
		const playing = localStorage.getItem('IsPlaying')
		if (playing == "false") {
			audio.pause()
			this.toggleIsPlaying()
		}
		else {
			audio.play()
		}
	}

	togglePlayBgMusic = () => {
		if (this.state.isPlaying) {
			this.toggleIsPlaying()
			localStorage.setItem('IsPlaying', false)
			document.querySelector('audio').pause()
		}
		else {
			this.toggleIsPlaying()
			localStorage.setItem('IsPlaying', true)
			document.querySelector('audio').play()
		}
	}


	render() {
		const {
			isMain,
			children,
			buttons,
			isNotLoggedIn,
			isLoading
		} = this.props;


		// console.log(this.isPlaying)
		return (
			<div className="main-content">

				<div className="wrapper">
					{
						isMain
							? <>
								<img className="logo-center" src={doodleUp} alt="DoodleUp" />
								<img className="book-corner" src={book} alt="Open book" />
								<img className="splat-blue-corner" src={splatBlue} alt="Blue splat of paint" />
								<img className="splat-pink-corner" src={splatPink} alt="Pink splat of paint" />
								<img className="paint-corner" src={paint} alt="Paint brush and palette" />
							</>
							: <Link to="/">
								<img className="logo-corner" src={doodleUp} alt="DoodleUp" />
							</Link>
					}

					{
						isLoading
							?
							<div>
								<img className="loader" src={loader} alt="Loader" />
							</div> :
							<></>
					}
					{children}
				</div>
				<div className="control-buttons">
					{
						!isNotLoggedIn
						&&
						<Button id="signOutBtn" circular icon="sign-out" size='massive' color='yellow' onClick={this.props.authLogout} />

					}
					<Button id="musicControlBtn" circular icon={this.state.isPlaying ? 'music' : 'mute'} size='massive' color='yellow' onClick={this.togglePlayBgMusic} />
					{buttons}
				</div>
			</div>

		)
	}
}

Page.propTypes = {
	authLogout: PropTypes.func.isRequired,
};

const dispatchers = {
	authLogout
};

export default connect(() => ({}), dispatchers)(Page);
