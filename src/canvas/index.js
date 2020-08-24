import React, { useRef, useEffect, useState } from 'react';

import outline from './../assets/outlineSample3.jpg';

function Canvas(props) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {

    function handleResize(){
      const canvas = canvasRef.current

      const canvasWidth = window.innerWidth * 0.5
      const canvasHeight = window.innerHeight * 0.7
      canvas.width = canvasWidth* 2
      canvas.height = canvasHeight * 2
      canvas.style.width = `${canvasWidth}px`
      canvas.style.height = `${canvasHeight}px`
      canvas.style.border = "2px solid black"
      const context = canvas.getContext("2d")

      context.scale(2,2)
      context.lineCap = "round"
      context.strokeStyle = "black"
      context.lineWidth = 5
      contextRef.current = context
    }
    handleResize()
    window.addEventListener('resize', handleResize)
  }, [])

  //for click and draw
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


  //for press and draw
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

  const handleClick = () =>{
    const canvas = canvasRef.current
    const image = canvas.toDataURL("image/svg")
    props.displayImage(image)
  }

  return (
    <div>
      <canvas 
      onMouseDown={mousePress}
      // onMouseUp={mouseRelease}
      onMouseMove={draw}
      ref={canvasRef}/>
      <button onClick={handleClick}>Download</button>
    </div>
  );
}

export default Canvas;
