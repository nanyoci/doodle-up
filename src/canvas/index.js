import React, { useRef, useEffect, useState } from 'react';

import outline from './../assets/outlineSample4.jpg';
// import cursorLightBlue from './../assets/cursorlightblue.png';

function Canvas(props) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const ERASER_RADIUS = 10;
  var image = new Image()
  var savedDrawing

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', () => {
      handleResize()
    })
  }, [])


  const handleResize = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    savedDrawing = canvasRef.current.toDataURL('img/svg')
    var canvasSize = 0
    if (window.innerHeight < window.innerWidth) {
      canvasSize = window.innerHeight * 0.7
    }
    else {
      canvasSize = window.innerWidth * 0.7
    }
    canvas.style.width = `${canvasSize}px`
    canvas.style.height = `${canvasSize}px`
    canvas.style.border = "2px solid black"
    canvas.width = canvasSize * 5
    canvas.height = canvasSize * 5
    context.scale(5, 5)
    context.lineCap = "round"
    context.strokeStyle = "black"
    context.lineWidth = canvasSize * canvasSize * 0.00001
    contextRef.current = context
    image.src = savedDrawing
    image.onload = function () {
      canvasRef.current.getContext('2d').drawImage(image, 0, 0, canvasSize, canvasSize)
    }
  }

  const startDrawing = ({ nativeEvent, type }) => {
    setIsDrawing(true);

    let offsetX, offsetY;
    if (type === "touchstart") {
      var rect = nativeEvent.target.getBoundingClientRect();
      var touch = nativeEvent.touches[0] || nativeEvent.changedTouches[0];
      offsetX = touch.pageX - rect.left;
      offsetY = touch.pageY - rect.top;
    } else {
      offsetX = nativeEvent.offsetX;
      offsetY = nativeEvent.offsetY;
    }

    if (props.currentColor == "#FFFFFF") {
      erase(offsetX, offsetY);
    } else {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
    }
  }

  const endDrawing = () => {
    setIsDrawing(false);

    if (props.currentColor != "#FFFFFF")
      contextRef.current.closePath();
  }

  const draw = ({ type, nativeEvent }) => {
    if (!isDrawing)
      return;

    let offsetX, offsetY;
    if (type === "touchmove") {
      var rect = nativeEvent.target.getBoundingClientRect();
      var touch = nativeEvent.touches[0] || nativeEvent.changedTouches[0];
      offsetX = touch.pageX - rect.left;
      offsetY = touch.pageY - rect.top;
    } else {
      offsetX = nativeEvent.offsetX;
      offsetY = nativeEvent.offsetY;
    }

    if (props.currentColor == "#FFFFFF") {
      erase(offsetX, offsetY);

    } else {
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.strokeStyle = props.currentColor
      contextRef.current.stroke();
    }
  }

  const erase = (x, y) => {
    contextRef.current.save();
    contextRef.current.beginPath();
    contextRef.current.arc(x, y, ERASER_RADIUS, 0, 2 * Math.PI, false);
    contextRef.current.clip();
    contextRef.current.clearRect(x - ERASER_RADIUS - 1, y - ERASER_RADIUS - 1, ERASER_RADIUS * 2 + 2, ERASER_RADIUS * 2 + 2);
    contextRef.current.closePath();
    contextRef.current.restore();
  }

  const handleClick = () => {
    const canvas = canvasRef.current
    const image = canvas.toDataURL("image/svg")
    props.displayImage(image)
  }

  return (
    <div>
      <canvas id="canvas"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
        onTouchStart={startDrawing}
        onTouchEnd={endDrawing}
        onTouchMove={draw}
        style={{
          touchAction: "none",
        }} />
      {/* <button onClick={handleClick}>Download</button> */}
    </div>
  );
}

export default Canvas;




// const redraw = () => {
//   const canvasWidth = window.innerWidth * 0.5
//   const canvasHeight = window.innerHeight * 0.7
//   image.src = savedDrawing
//   var ratio = 1
//   image.onload = function () {
//     const widthRatio = image.width / canvasWidth
//     const heightRatio = image.height / canvasHeight
//     if (widthRatio > heightRatio) {
//       ratio = widthRatio
//     }
//     else {
//       ratio = heightRatio
//     }
//     const widthDraw = image.width / ratio
//     const heightDraw = image.height / ratio
//     console.log(widthRatio, heightRatio)
//     //postion center
//     if (widthRatio > heightRatio) {
//       const yPos = canvasHeight / 2 - heightDraw / 2
//       canvasRef.current.getContext('2d').drawImage(image, 0, yPos, widthDraw, heightDraw)
//       canvasRef.current.getContext('2d').strokeRect(0, yPos, widthDraw, heightDraw)
//       console.log("scale width")
//     }
//     else {
//       const xPos = canvasWidth / 2 - widthDraw / 2
//       canvasRef.current.getContext('2d').drawImage(image, xPos, 0, widthDraw, heightDraw)
//       canvasRef.current.getContext('2d').strokeRect(xPos, 0, widthDraw, heightDraw)
//       console.log("scale height")
//     }
//   }

//   resizing = false
// }