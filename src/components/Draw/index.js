import React, { useState } from 'react';
import { Button } from 'semantic-ui-react'

import './index.css'

import Canvas from '../Canvas'
import Stationery from '../Stationery'
import Outline from '../Outline'
import Page from '../Page';

function Draw() {

  const [lines, setLines] = useState([])
  const [showOutline, setShowOutline] = useState(true)

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


  const displayImage = (image) => {
    const img = document.createElement("img")
    img.src = image
    document.body.appendChild(img)
  }

  const handleToggle = () => {
    setShowOutline(!showOutline)
  }

  const getToggleBtn = () => {
    return (<Button circular icon={showOutline ? 'eye' : 'eye slash'} size='massive' color='yellow' onClick={handleToggle} />)
  }


  return (

    <div>
      <Page className="draw-page" buttons={getToggleBtn()} >
        <div className="drawing-box">
          <div className="drawing-box-ratio"></div>
          {showOutline && <Outline />}
          <Canvas currentColor={currentColor} lines={lines} setLines={setLines} displayImage={displayImage} />
        </div>
        <div id="stationery">
          <Stationery color={color} selectColor={setCurrentColor} />
        </div>
      </Page>
    </div >

  );
}

export default Draw;