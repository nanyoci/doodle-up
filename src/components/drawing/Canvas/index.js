import React, { useRef, useEffect, useState, forwardRef } from 'react';

import './index.css'

function Canvas(props, ref) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const ERASER_RADIUS = 10;

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      ref.current = canvas;

      if (!canvas)
        return;

      const context = canvas.getContext("2d")
      const savedDrawing = canvasRef.current.toDataURL('img/svg')
      canvas.width = canvas.offsetHeight * 5;
      canvas.height = canvas.offsetHeight * 5;
      context.scale(5, 5);
      context.lineCap = "round"
      context.strokeStyle = "black"
      context.lineWidth = 3
      contextRef.current = context;
      var image = new Image();
      image.src = savedDrawing
      image.onload = function () {
        if (canvasRef.current) {
          canvasRef.current.getContext('2d').drawImage(image, 0, 0, canvas.offsetWidth, canvas.offsetHeight)
        }
      }
    }

    handleResize();
    window.addEventListener('resize', () => handleResize());
  }, [ref])

  const startDrawing = ({ nativeEvent, type }) => {
    setIsDrawing(true);

    let offsetX, offsetY;
    if (type === "touchstart") {
      var rect = nativeEvent.target.getBoundingClientRect();
      var touch = nativeEvent.touches[0] || nativeEvent.changedTouches[0];
      offsetX = touch.pageX - (rect.left + window.scrollX);
      offsetY = touch.pageY - (rect.top + window.scrollY);
    } else {
      offsetX = nativeEvent.offsetX;
      offsetY = nativeEvent.offsetY;
    }

    if (props.currentColor === "#FFFFFF") {
      erase(offsetX, offsetY);
    } else {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
    }
  }

  const endDrawing = () => {
    setIsDrawing(false);

    if (props.currentColor !== "#FFFFFF")
      contextRef.current.closePath();
  }

  const draw = ({ type, nativeEvent }) => {
    if (!isDrawing)
      return;

    let offsetX, offsetY;
    if (type === "touchmove") {
      var rect = nativeEvent.target.getBoundingClientRect();
      var touch = nativeEvent.touches[0] || nativeEvent.changedTouches[0];
      offsetX = touch.pageX - (rect.left + window.scrollX);
      offsetY = touch.pageY - (rect.top + window.scrollY);
    } else {
      offsetX = nativeEvent.offsetX;
      offsetY = nativeEvent.offsetY;
    }

    if (props.currentColor === "#FFFFFF") {
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

  return (
    <canvas
      className="drawing-canvas"
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseUp={endDrawing}
      onMouseMove={draw}
      onTouchStart={startDrawing}
      onTouchEnd={endDrawing}
      onTouchMove={draw}
    />
  );
}

export default forwardRef(Canvas);
