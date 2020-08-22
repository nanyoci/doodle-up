import React, { useRef, useEffect, useState } from 'react';

import Canvas from './../canvas'
import Stationery from './../stationery'

function Draw() {

  const[lines, setLines] = useState([])
  
  const color = {
    LIGHTBLUE: '#00D7DF',
    RED: '#DF0000',
    ORANGE: '#FF9811',
    GREEN: '#04DF00',
    BLUE: '#0031DF',
    PURPLE: '#B311FF',
    PINK: '#FF1192',
    YELLOW: '#FFF511',
    BLACK:'#000000',
  } 

    const [currentColor, setCurrentColor] = useState(color.BLACK);

  return (
    <div id="draw">
        <Canvas currentColor={currentColor} lines={lines} setLines={setLines}/>
        <Stationery color={color} selectColor = {setCurrentColor}/>
   </div>
  );
}

export default Draw;