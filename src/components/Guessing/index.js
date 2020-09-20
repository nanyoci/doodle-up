import React, { useEffect, useState } from 'react';

import Page from '../Page';
import './index.css'


import dino from './../../assets/dino.jpg'
import audio from './../../assets/audio.svg'
import next from './../../assets/nextArrow.svg'


function Guessing() {


    const optionState = {
        initial: "btn btn-outline-dark ",
        wrong: "btn btn-danger ",
        correct: "btn btn-primary "
    }

    const [currentState, setCurrentState] = useState(
        [
            {
                state: optionState.initial
            },
            {
                state: optionState.initial
            },
            {
                state: optionState.initial
            },
            {
                state: optionState.initial
            }
        ]
    )


    const submit = (answer) => {
        let allOptions = [...currentState];
        let selectedOption = { ...allOptions[answer] };
        if (answer != 3) {
            selectedOption.state = optionState.wrong;
        }
        else {
            selectedOption.state = optionState.correct;
        }
        allOptions[answer] = selectedOption;
        setCurrentState(allOptions);
        console.log(allOptions)
    }

    return (
        <Page>
            <div id="guessing">
                <h1 id="guessTheName">Guess the Name!</h1>
                <div id="guessingImgDiv" >
                    <img id="guessingImg" src={dino} />
                </div>
                <div id="options">
                    <div className="options-row">
                        <div className="optionUnit">
                            <img src={audio} className="audioIcon" alt="audio" />
                            <button type="button" className={`${currentState[0].state} option`} disabled={currentState[0].state == optionState.wrong} onClick={() => submit(0)}>Lady Bug</button>

                        </div>
                        <div className="optionUnit">
                            <img src={audio} className="audioIcon" alt="audio" />
                            <button type="button" className={`${currentState[1].state} option`} disabled={currentState[1].state == optionState.wrong} onClick={() => submit(1)}>Scary Cat</button></div>

                    </div>
                    <div className="options-row">
                        <div className="optionUnit">
                            <img src={audio} className="audioIcon" alt="audio" />
                            <button type="button" className={`${currentState[2].state} option`} disabled={currentState[2].state == optionState.wrong} onClick={() => submit(2)}>Angry Bird</button>

                        </div>
                        <div className="optionUnit">
                            <img src={audio} className="audioIcon" alt="audio" />
                            <button type="button" className={`${currentState[3].state} option`} disabled={currentState[3].state == optionState.correct} onClick={() => submit(3)}>Dinosaur</button>

                        </div>
                    </div>
                </div>
                <img src={next} alt="next" id="next" />
            </div >
        </Page>
    );
}

export default Guessing;