import React from 'react'

import next from './../../assets/nextArrow.svg';
import './index.css';

export default function NextButton({ onClick }) {
	return (
		<button className="next">
			<img src={next} alt="next" onClick={onClick} />
		</button>
	)
}
