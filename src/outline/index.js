import React, { useRef, useEffect, useState } from 'react';

import './index.css'

import outlineImg from './../assets/outlineSample4.jpg';

function Outline(props) {

  const outlineRef = useRef(null)

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
  }, [])


  const handleResize = () => {
    var canvasSize = 0
    if (window.innerHeight < window.innerWidth) {
      canvasSize = window.innerHeight * 0.68
    }
    else {
      canvasSize = window.innerWidth * 0.68
    }
    outlineRef.current.style.width = `${canvasSize}px`
    outlineRef.current.style.height = `${canvasSize}px`

  }
  return (
    <div id="outlineDiv" ref={outlineRef} />
  );
}

export default Outline;
