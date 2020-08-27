import React, { useRef, useEffect, useState } from 'react';

import './index.css';

import LightBluePencil from './../assets/pencillightblue.svg'
import RedPencil from './../assets/pencilred.svg'
import OrangePencil from './../assets/pencilorange.svg'
import GreenPencil from './../assets/pencilgreen.svg'
import BluePencil from './../assets/pencilblue.svg'
import PurplePencil from './../assets/pencilpurple.svg'
import PinkPencil from './../assets/pencilpink.svg'
import YellowPencil from './../assets/pencilyellow.svg'
import BlackPencil from './../assets/pencilblack.svg'
import Eraser from './../assets/eraser.png'

function Stationery(props) {


    useEffect(() => {
        document.getElementById("tools").style.cursor = "pointer";
    }, [])

    const selectColor = (colorSelect) => {
        props.selectColor(colorSelect)
    }


    return (
        <div id="tools">
            <img className="tool" src={LightBluePencil} alt="Black Pencil" onClick={() => selectColor(props.color.LIGHTBLUE)} />
            <img className="tool" src={RedPencil} alt="Red Pencil" onClick={() => selectColor(props.color.RED)} />
            <img className="tool" src={OrangePencil} alt="Orange Pencil" onClick={() => selectColor(props.color.ORANGE)} />
            <img className="tool" src={GreenPencil} alt="GReen Pencil" onClick={() => selectColor(props.color.GREEN)} />
            <img className="tool" src={BluePencil} alt="Blue Pencil" onClick={() => selectColor(props.color.BLUE)} />
            <img className="tool" src={PurplePencil} alt="Purple Pencil" onClick={() => selectColor(props.color.PURPLE)} />
            <img className="tool" src={PinkPencil} alt="Pink Pencil" onClick={() => selectColor(props.color.PINK)} />
            <img className="tool" src={YellowPencil} alt="Yellow Pencil" onClick={() => selectColor(props.color.YELLOW)} />
            <img className="tool" src={BlackPencil} alt="Black Pencil" onClick={() => selectColor(props.color.BLACK)} />
            <img className="tool" src={Eraser} alt="Eraser" onClick={() => selectColor(props.color.ERASER)} />
        </div>

    );
}

export default Stationery;
