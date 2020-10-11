import React, { useRef, useState } from 'react';
import { Button } from 'semantic-ui-react'

import './index.css'

import Canvas from '../Canvas'
import Stationery from '../Stationery'
import Outline from '../Outline'
import Page from '../Page';
import NextButton from '../NextButton';

function Draw(props) {
	const {
		stage: {
			image,
		},
		onComplete,
	} = props;

	const [lines, setLines] = useState([])
	const [showOutline, setShowOutline] = useState(true)
	const canvasRef = useRef(null);

	const color = {
		LIGHTBLUE: '#00D7DF',
		RED: '#DF0000',
		ORANGE: '#FF9811',
		GREEN: '#04DF00',
		BLUE: '#0031DF',
		PURPLE: '#B311FF',
		PINK: '#FF1192',
		YELLOW: '#FFF511',
		BLACK: '#000000',
		GRAY: '#8F8F8F',
		DARKGREEN: '#008937',
		BROWN: '#752A00',
		ERASER: '#FFFFFF'
	}

	const [currentColor, setCurrentColor] = useState(color.BLACK);

	const handleToggle = () => {
		setShowOutline(!showOutline)
	}

	const getToggleBtn = () => {
		return (<Button circular icon={showOutline ? 'eye' : 'eye slash'} size='massive' color='yellow' onClick={handleToggle} />)
	}

	const handleComplete = () => {
		const canvas = canvasRef.current;
		const drawing = canvas.toDataURL("image/svg");
		onComplete(drawing);
	}

	return (
		<Page className="draw-page" buttons={getToggleBtn()} >
			<div style={{ position: "relative", display: "flex" }}>
				<div className="drawing-box">
					<div className="drawing-box-ratio"></div>
					{showOutline && <Outline image={image} />}
					<Canvas
						ref={canvasRef}
						currentColor={currentColor}
						lines={lines}
						setLines={setLines}
					/>
				</div>
				<NextButton onClick={handleComplete} />
			</div>
			<div id="stationery">
				<Stationery color={color} selectColor={setCurrentColor} />
			</div>
		</Page>

	);
}

export default Draw;