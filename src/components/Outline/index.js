import React, { useRef } from 'react';

import './index.css'

import outlineImg from '../../assets/outlineSample4.jpg';

function Outline(props) {
  const backgroundUrl = outlineImg;

  const outlineRef = useRef(null)
  return (
    <div
      className="drawing-outline"
      ref={outlineRef}
      style={{
        backgroundImage: `url("${backgroundUrl}")`,
      }}
    />
  );
}

export default Outline;
