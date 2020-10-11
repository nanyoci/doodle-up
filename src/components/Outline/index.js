import React, { useRef } from 'react';

import './index.css'

import outlineImg from '../../assets/outlineSample4.jpg';

function Outline({ image }) {
  const backgroundUrl = outlineImg;

  const outlineRef = useRef(null)
  return (
    <div
      className="drawing-outline"
      ref={outlineRef}
      style={{
        backgroundImage: `url("${image}")`,
      }}
    />
  );
}

export default Outline;
