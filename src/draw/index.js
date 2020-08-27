import React, { useRef, useEffect, useState } from 'react';

import './index.css'

import Canvas from './../canvas'
import Stationery from './../stationery'
import Outline from './../outline'

function Draw() {

  const [lines, setLines] = useState([])

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
    ERASER: '#FFFFFF'
  }

  const [currentColor, setCurrentColor] = useState(color.BLACK);


  const displayImage = (image) => {
    const img = document.createElement("img")
    img.src = image
    document.body.appendChild(img)
  }


  return (
    <div id="draw">
      <Outline />
      <Canvas currentColor={currentColor} lines={lines} setLines={setLines} displayImage={displayImage} />
      <Stationery color={color} selectColor={setCurrentColor} />
    </div>
  );
}

export default Draw;