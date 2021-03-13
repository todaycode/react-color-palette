import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import {DEFAULT_SCALE} from '../constants';

export const FlipPalettes  = props => {
    const scale = props.colorscale ? props.colorscale : DEFAULT_SCALE;
    const colorscaleElementRef = useRef(null);
    console.log("scale",scale)
    return (
      <div style={{width: '100%'}} className={props.name? "colorscale-container display-pos" :"colorscale-container"}>
        <div
          className="colorscale-palette-container"
          style={{
            display: 'inline-block',
            textAlign: 'start',
            width: props.label ? '75%' : '100%',
            height: props.name? '50px' : '20px',
            border: props.name? '3px solid' : '0px'
          }}
          ref = { colorscaleElementRef }
        >
          <div
            className="colorscale-block"
            style={{
              fontSize: '0px',
              display: 'inline-block',
              width: '100%',
            }}
            onClick={() => {
              let prevDiv = document.getElementsByClassName('borderClass');
              if(prevDiv.length !== 0) prevDiv[0].classList.remove('borderClass');
              let selectedDiv = ReactDOM.findDOMNode(colorscaleElementRef.current);
              selectedDiv.classList.add("borderClass");
              return props.onClick(scale, props.start, props.rot)
            }}
          >
            {scale.map((x, i) => (
              <div
                key={i}
                className={props.name ? "colorscale-swatch display-swatch": "colorscale-swatch"}
                style={{
                  backgroundColor: x,
                  width: '' + 100.0 / scale.length + '%',
                  height: '20px',
                  margin: '0 auto',
                  display: 'inline-block',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
}
