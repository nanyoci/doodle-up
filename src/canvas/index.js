import React, { useRef, useEffect, useState } from 'react';

import outline from './../assets/outlineSample.jpg';

function Canvas(props) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * 0.5 * 2
    canvas.height = window.innerHeight * 0.7 * 2
    canvas.style.width = `${window.innerWidth * 0.5}px`
    canvas.style.height = `${window.innerHeight * 0.7}px`
    canvas.style.border = "2px solid black"

    const context = canvas.getContext("2d")
    const background = new Image();
    background.src = outline;

    context.scale(2,2)
    background.onload = function(){
      context.drawImage(background,0,0);   
    }   
    context.lineCap = "round"
    context.strokeStyle = "black"
    context.lineWidth = 5
    contextRef.current = context
  }, [])

  const mousePress = ({nativeEvent}) => {
    console.log(nativeEvent)
    if(!isDrawing){
      const {offsetX, offsetY} = nativeEvent
      contextRef.current.beginPath()
      contextRef.current.moveTo(offsetX, offsetY)
      setIsDrawing(true)
    }

    else{
      contextRef.current.closePath()
      setIsDrawing(false)
      console.log(props)
    }
    
  }

  const draw = ({nativeEvent}) => {
    if(!isDrawing){
      return
    }
    const {offsetX, offsetY} = nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.strokeStyle = props.currentColor
    contextRef.current.stroke()
    console.log(nativeEvent)
  }


  // const startDrawing = ({nativeEvent}) => {
  //   console.log(nativeEvent)
  //   const {offsetX, offsetY} = nativeEvent
  //   contextRef.current.beginPath()
  //   contextRef.current.moveTo(offsetX, offsetY)
  //   setIsDrawing(true)
  // }

  // const finishDrawing = () => {
  //   contextRef.current.closePath()
  //   setIsDrawing(false)
  // }

  // const draw = ({nativeEvent}) => {
  //   if(!isDrawing){
  //     return
  //   }
  //   const {offsetX, offsetY} = nativeEvent
  //   contextRef.current.lineTo(offsetX, offsetY)
  //   contextRef.current.stroke()
  //   console.log(nativeEvent)
  // }

  return (
    <canvas 
    onMouseDown={mousePress}
    // onMouseUp={mouseRelease}
    onMouseMove={draw}
    ref={canvasRef}></canvas>
  );
}

export default Canvas;
