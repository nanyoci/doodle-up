import React from 'react';
import useSound from 'use-sound';

import audioImage from '../../../assets/audio.svg';
import Page from '../../common/Page';
import NextButton from '../../common/NextButton';
import './index.css';

export function StoryPage(props) {
	const {
		stage: {
			audio,
			description,
			image,
			drawings,
		},
		onComplete,
		progress,
	} = props;

	const [playNarration] = useSound(audio);

	let drawingsWithUrls = [];

	if (drawings) {
		for (let i = 0; i < drawings.length; i++) {
			const {
				stage_id,
				width,
				top,
				left,
			} = drawings[i];
			
			let stageProgress = progress.stages.find(stage => stage.stage_id === stage_id);
			
			if (stageProgress && stageProgress.image_url && stageProgress.image_url !== "") {
				drawingsWithUrls.push(
					<img
						key={stage_id}
						src={stageProgress.image_url}
						className="story-object"
						style={{
							width: `${width / 16}%`,
							top: `${top / 9}%`,
							left: `${left / 16}%`,
						}}
						alt="Child's drawing of the story object"
					/>
				)
			}
		}
	}

	return (
		<Page>
			<div className="story-page-container">
				<div className="story-scene-container">
					<div className="story-scene">
						<img src={image} className="story-bg" alt="Story background" />
						{drawingsWithUrls}
					</div>
				</div>
				<img src={audioImage} className="audio-icon" alt="Play audio" onClick={playNarration} />
				<p className="story-text">{description}</p>
				<NextButton onClick={onComplete} />
			</div>
		</Page>
	)
}

export default StoryPage;
