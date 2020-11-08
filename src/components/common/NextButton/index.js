import React from 'react'
import { Button } from 'semantic-ui-react'
import './index.css';

export default function NextButton({ onClick }) {
	return (
		<Button data-testid="next-button" className="next" circular icon='arrow right' alt="next" onClick={onClick} size='massive' color='yellow' />

	)
}
