import React from 'react'
import { Button } from 'semantic-ui-react'
import './index.css';

export default function NextButton({ onClick }) {
	return (
		<Button className="next" circular icon='arrow right' alt="next" onClick={onClick} size='massive' color='yellow' />

	)
}
