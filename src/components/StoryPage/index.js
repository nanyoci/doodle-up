import React from 'react';

import useSound from 'use-sound';
import drawingSample from '../../assets/drawing-sample.png';
import audioImage from './../../assets/audio.svg';
import Page from '../Page';
import './index.css';
import NextButton from '../NextButton';

// TODO: Import drawings
export default function StoryPage(props) {
	const {
		stage: {
			audio,
			description,
			image,
			drawings,
		},
		onComplete,
	} = props;

	const [playNarration] = useSound(audio);

	return (
		<Page>
			<div className="story-page-container">
				<div className="story-scene-container">
					<div className="story-scene">
						<img src={image} className="story-bg" alt="Story background" />
						{
							drawings
							&& drawings.map(drawing => (
								<img
									key={drawing.stage_id}
									src={drawingSample}
									className="story-object"
									style={{
										width: `${drawing.width / 16}%`,
										top: `${drawing.top / 9}%`,
										left: `${drawing.left / 16}%`,
									}}
									alt="Child's drawing of the story object"
								/>
							))
						}
					</div>
				</div>
				<img src={audioImage} className="audio-icon" alt="Play audio" onClick={playNarration} />
				<p className="story-text">{description}</p>
				<NextButton onClick={onComplete} />
			</div>
		</Page>
	)
}
