import React from 'react';
import App from './../App';
import BackgroundMusic from './../BackgroundMusic'

function AppWithBgMusic() {
    return (
        <>
            <BackgroundMusic />
            <App />
        </>
    )
}

export default AppWithBgMusic;