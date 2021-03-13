import React, { useState } from 'react';
import { FlipPalettes } from '../FlipPalettes';
import colorbrewer from 'colorbrewer';
import 'rc-slider/assets/index.css';

import {
  COLORSCALE_TYPES,
  BREWER,
  DEFAULT_SCALE,
  DEFAULT_SWATCHES
} from '../constants/index';

import '../css/ColorscalePicker.css';

export const FlipPicker = props => {

  const [colorscale, setcolorscale] = useState(props.colorscale || DEFAULT_SCALE);
  const [nSwatches, setnSwatches] = useState((props.colorscale || DEFAULT_SCALE).length);
  const [colorscaleType, setcolorscaleType] = useState(props.colorscaleType || 'Sequential');

  const onClick = (newColorscale) => {
    props.onChange(newColorscale);
  };

  const colorscaleOptions = COLORSCALE_TYPES.map(c => ({
    label: c + ' scales',
    value: c,
  }));

  const colorscalePickerContainerClassnames =
    'colorscalePickerContainer' +
    (props.className ? ' ' + props.className : '');
  return (
    <div
      className={colorscalePickerContainerClassnames}
      style={{width: props.width || '250px'}}
    >
      {colorscaleOptions.map((option,i) => {
        return(<div className="colorscalePickerTopContainer" key={i}>
              {option.value}
              <FlipPaletteSelector
                colorscaleType={option.value}
                onClick={onClick}
                scaleLength={props.scaleLength}
            />
        </div>) 
      })}
    </div>
  );
}

const  FlipPaletteSelector  = props => {
    const {
      colorscaleType,
      onClick,
    } = props;
    return (
      <div className="colorscalePickerBottomContainer">
        <div style={{margin: '0 auto'}}>
          {BREWER.hasOwnProperty(colorscaleType) &&
            BREWER[colorscaleType].map((x, i) => {
              return <FlipPalettes
                key={i}
                onClick={onClick}
                colorscale={colorbrewer[x][DEFAULT_SWATCHES]}
                label={x}
                scaleLength={colorbrewer[x][DEFAULT_SWATCHES].length}
              />
          })}
        </div>
      </div>
    );
}
