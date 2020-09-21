import React, { useRef, useEffect, useState } from 'react';
import Reward from 'react-rewards';
import useSound from 'use-sound';

import './index.css'

import Page from '../Page';
import dino from './../../assets/dino.jpg'
import audio from './../../assets/audio.svg'
import next from './../../assets/nextArrow.svg'
import confettiSound from '../../assets/soundFX/confetti.mp3';
import tryAgainSound from '../../assets/soundFX/tryAgain.mp3';



function Guessing() {

    var rewardLeft, rewardRight

    const optionState = {
        initial: "btn btn-outline-dark ",
        wrong: "btn btn-danger ",
        correct: "btn btn-primary "
    }
    const [correctAnswer, toggleCorrectAnswer] = useState(false)
    const [currentOptionState, setCurrentOptionState] = useState(
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

    const [playConfettiSound] = useSound(
        confettiSound,
        { volume: 0.25 }
    )
    const [playTryAgainSound] = useSound(
        tryAgainSound,
        { volume: 0.5 }
    )

    const submit = (answer) => {
        let allOptions = [...currentOptionState];
        let selectedOption = { ...allOptions[answer] };
        if (answer != 3) {
            selectedOption.state = optionState.wrong;
            playTryAgainSound()
        }
        else {
            selectedOption.state = optionState.correct;
            toggleCorrectAnswer(!correctAnswer)
            handleReward()
            playConfettiSound()

        }
        allOptions[answer] = selectedOption;
        setCurrentOptionState(allOptions);
        console.log(allOptions)
    }

    const handleReward = () => {
        rewardLeft.rewardMe()
        rewardRight.rewardMe()
    }

    return (
        <Page id="guessingContainer">
            <div id="guessing">
                <h1 id="guessTheName">Guess the Name!</h1>
                <div id="guessingImgDiv" >
                    <img id="guessingImg" src={dino} />
                </div>
                <div id="options">
                    <div className="options-row">
                        <div className="optionUnit">
                            <img src={audio} className="audioIcon" alt="audio" />
                            <button type="button" className={`${currentOptionState[0].state} option`} disabled={currentOptionState[0].state == optionState.wrong | correctAnswer} onClick={() => submit(0)}>Lady Bug</button>

                        </div>
                        <div className="optionUnit">
                            <img src={audio} className="audioIcon" alt="audio" />
                            <button type="button" className={`${currentOptionState[1].state} option`} disabled={currentOptionState[1].state == optionState.wrong | correctAnswer} onClick={() => submit(1)}>Scary Cat</button></div>

                    </div>
                    <div className="options-row">
                        <div className="optionUnit">
                            <img src={audio} className="audioIcon" alt="audio" />
                            <button type="button" className={`${currentOptionState[2].state} option`} disabled={currentOptionState[2].state == optionState.wrong | correctAnswer} onClick={() => submit(2)}>Angry Bird</button>

                        </div>
                        <div className="optionUnit">
                            <img src={audio} className="audioIcon" alt="audio" />
                            <button type="button" className={`${currentOptionState[3].state} option`} disabled={currentOptionState[3].state == optionState.correct | correctAnswer} onClick={() => submit(3)}>Dinosaur</button>

                        </div>
                    </div>
                </div>
                {correctAnswer ? <img src={next} alt="next" id="next" /> : null}
            </div >
            <div id='rewardContainer'>
                <div className='rewards'>
                    <Reward
                        ref={(ref) => { rewardLeft = ref }}
                        type='confetti'
                        config={
                            { angle: 50, spread: 100, elementCount: 100, elementSize: 15 }
                        }
                    ></Reward>
                </div>
                <div className='rewards'>
                    <Reward
                        ref={(ref) => { rewardRight = ref }}
                        type='confetti'
                        config={
                            { angle: 130, spread: 100, elementCount: 100, elementSize: 15 }
                        }
                    ></Reward>
                </div>
            </div>

        </Page>
    );
}

export default Guessing;