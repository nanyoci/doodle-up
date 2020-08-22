import React, { useRef, useEffect, useState } from 'react';

import outline from './../assets/outlineSample3.jpg';

function Canvas(props) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current

    const canvasWidth = window.innerWidth * 0.5
    const canvasHeight = window.innerHeight * 0.7
    canvas.width = canvasWidth* 2
    canvas.height = canvasHeight * 2
    canvas.style.width = `${canvasWidth}px`
    canvas.style.height = `${canvasHeight}px`
    canvas.style.border = "2px solid black"
    const context = canvas.getContext("2d")
    const background = new Image();
    background.src = outline;

    let ratio = 1
    background.onload = function(){
      //fit background
      const widthRatio = background.width / canvasWidth
      const heightRatio =  ratio = background.height / canvasHeight
      if(widthRatio > heightRatio){
        ratio = widthRatio
      }
      else{
        ratio = heightRatio
      }
      const widthDraw = background.width / ratio
      const heightDraw = background.height / ratio

      //postion center
      if(widthRatio > heightRatio){
        const yPos = canvasHeight/2 - heightDraw/2
        context.drawImage(background, 0, yPos, widthDraw, heightDraw) 
      }
      else{
        const xPos = canvasWidth/2 - widthDraw/2
        context.drawImage(background, xPos, 0, widthDraw, heightDraw) 
      }
      
    }   

    context.scale(2,2)
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
