import React from 'react'
import useSound from 'use-sound';

import audioImage from './../../assets/audio.svg';

export default function AudioButton(props) {
	const {
		audio,
	} = props;

	const [playAudio] = useSound(audio);

	return (
		<button>
			<img src={audioImage} className="audio-icon" alt="Play audio" onClick={playAudio} />
		</button>
	)
}
