import React from 'react';

import './index.css'

function Outline({ image }) {
  return (
    <div
      className="drawing-outline"
      style={{
        backgroundImage: `url("${image}")`,
      }}
    />
  );
}

export default Outline;
