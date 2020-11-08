import React, { useState, useRef } from 'react';
import useSound from 'use-sound';
import Reward from 'react-rewards';

import Page from '../../common/Page';
import NextButton from '../../common/NextButton';
import GuessingOption from '../GuessingOption';
import confettiSound from '../../../assets/soundFX/confetti.mp3';
import tryAgainSound from '../../../assets/soundFX/tryAgain.mp3';
import './index.css';

// TODO: Fix button size on ipad
function Guessing(props) {
    const {
        stage: {
            options,
            answer: answerText,
            image,
        },
        onComplete,
    } = props;

    const [isComplete, setIsComplete] = useState(false)

    const rewardLeft = useRef(null);
    const rewardRight = useRef(null);

    const [playConfettiSound] = useSound(
        confettiSound,
        { volume: 0.25 }
    )

    const [playTryAgainSound] = useSound(
        tryAgainSound,
        { volume: 0.5 }
    )

    const handleSubmit = isCorrect => {
        if (isCorrect) {
            setIsComplete(true);
            handleReward();
            playConfettiSound();
        } else {
            playTryAgainSound();
        }
    }

    const handleReward = () => {
        if (!props.test) {
            rewardLeft.current.rewardMe()
            rewardRight.current.rewardMe()
        }
    }

    return (
        <Page>
            <div className="guessing-container">
                <h1 id="guessTheName">Guess the Name!</h1>
                <div id="guessingImgDiv" >
                    <img id="guessingImg" src={image} alt="For guessing" />
                </div>
                <div className="options">
                    {
                        Object.keys(options).map(text => (
                            <GuessingOption
                                key={text}
                                text={text}
                                audio={options[text]}
                                isCorrect={text === answerText}
                                isComplete={isComplete}
                                onSubmit={handleSubmit}
                            />
                        ))
                    }
                </div>
                {
                    isComplete &&
                    <NextButton onClick={onComplete} />
                }
            </div >
            <div className='reward-container'>
                <div className='rewards'>
                    <Reward
                        ref={rewardLeft}
                        type='confetti'
                        config={
                            { angle: 50, spread: 100, elementCount: 100, elementSize: 15 }
                        }
                    >
                        {""}
                    </Reward>
                </div>
                <div className='rewards'>
                    <Reward
                        ref={rewardRight}
                        type='confetti'
                        config={
                            { angle: 130, spread: 100, elementCount: 100, elementSize: 15 }
                        }
                    >
                        {""}
                    </Reward>
                </div>
            </div>
        </Page>
    );
}

export default Guessing;