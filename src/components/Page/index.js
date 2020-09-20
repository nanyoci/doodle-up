import React from 'react';

import doodleUp from '../../assets/doodle-up.svg';
import book from '../../assets/book.svg';
import paint from '../../assets/paint.svg';
import splatPink from '../../assets/splat-pink.png';
import splatBlue from '../../assets/splat-blue.png';
import './index.css';

export default function Page(props) {
	const {
		isMain,
		children,
	} = props;

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
						: <img className="logo-corner" src={doodleUp} alt="DoodleUp" />
				}
				{children}
			</div>
		</div>
	)
}
