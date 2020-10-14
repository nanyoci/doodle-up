import React, { useState } from 'react';
import useSound from 'use-sound';

import audioIcon from '../../../assets/audio.svg';
import './index.css';

export default function GuessingOption(props) {
	const {
		text,
		audio,
		isComplete,
		isCorrect,
		onSubmit,
	} = props;

	const [isClicked, setIsClicked] = useState(false);
	const [playAudio] = useSound(audio);
	const handleSubmit = () => {
		setIsClicked(true);
		onSubmit(isCorrect);
	}

	let className = "option btn";

	if (!isClicked)
		className += " btn-outline-dark";
	else {
		if (isCorrect)
			className += " btn-primary";
		else
			className += " btn-danger";
	}

	return (
		<div className="option-unit">
			<img src={audioIcon} className="audio-icon" alt="audio" onClick={playAudio} />
			<button
				className={className}
				disabled={isComplete || isClicked}
				onClick={handleSubmit}
			>
				{text}
			</button>
		</div>
	)
}
