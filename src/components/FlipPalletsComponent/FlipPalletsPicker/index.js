import React, {Component} from 'react';
import FlipPallets from '../FlipPallets/index';
import chroma from 'chroma-js';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import colorbrewer from 'colorbrewer';
// import 'react-select/dist/react-select.css';
import 'rc-slider/assets/index.css';

import {
  COLORSCALE_TYPES,
  BREWER,
  SCALES_WITHOUT_LOG,
  DEFAULT_SCALE,
  DEFAULT_BREAKPOINTS,
  DEFAULT_START,
  DEFAULT_LOG_BREAKPOINTS,
  DEFAULT_ROTATIONS,
  DEFAULT_LIGHTNESS,
  DEFAULT_NCOLORS,
  DEFAULT_SWATCHES
} from '../constants';

import '../css/ColorscalePicker.css';

const Handle = Slider.Handle;

export function getColorscale(
  colorscale,
  nSwatches,
  logBreakpoints,
  log,
  colorscaleType
) {
  /*
   * getColorscale() takes a scale, modifies it based on the input
   * parameters, and returns a new scale
   */
  // helper function repeats a categorical colorscale array N times
  let repeatArray = (array, n) => {
    let arrays = Array.apply(null, new Array(n));
    arrays = arrays.map(function() {
      return array;
    });
    return [].concat.apply([], arrays);
  };

  let cs = chroma.scale(colorscale).mode('lch');
  console.log("cs",cs)

  if (log) {
    const logData = Array(nSwatches)
      .fill()
      .map((x, i) => i + 1);
    cs = cs.classes(chroma.limits(logData, 'l', logBreakpoints));
  }

  let discreteScale = cs.colors(nSwatches);

  // repeat linear categorical ("qualitative") colorscales instead of repeating them
  if (!log && colorscaleType === 'categorical') {
    discreteScale = repeatArray(colorscale, nSwatches).slice(0, nSwatches);
  }

  return discreteScale;
}

export default class FlipPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorscale: this.props.colorscale || DEFAULT_SCALE,
      nSwatches: (this.props.colorscale || DEFAULT_SCALE).length,
      previousColorscale: this.props.colorscale || DEFAULT_SCALE,
      colorscaleType:
        this.props.colorscaleType || this.props.initialColorscaleType,
      log: false,
      logBreakpoints: DEFAULT_LOG_BREAKPOINTS,
      customBreakpoints: DEFAULT_BREAKPOINTS,
      previousCustomBreakpoints: null,
      cubehelix: {
        start: DEFAULT_START,
        rotations: DEFAULT_ROTATIONS,
      },
    };

    this.onClick = this.onClick.bind(this);
    this.setColorscaleType = this.setColorscaleType.bind(this);
    this.updateCubehelixStart = this.updateCubehelixStart.bind(this);
    this.updateCubehelixRotations = this.updateCubehelixRotations.bind(this);
    this.updateCubehelix = this.updateCubehelix.bind(this);
    this.toggleLog = this.toggleLog.bind(this);
    this.handle = this.handle.bind(this);
  }

  componentDidMount() {
    this.setState({colorscaleOnMount: this.props.colorscale});
  }

  handle = props => {
    const {value, dragging, index, ...restProps} = props;
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  };

  toggleLog = () => {
    const cs = getColorscale(
      this.state.previousColorscale,
      this.state.nSwatches,
      this.state.logBreakpoints,
      !this.state.log,
      this.state.colorscaleType
    );
    this.setState({log: !this.state.log, colorscale: cs});

    this.props.onChange(cs);
  };

  onClick = (newColorscale, start, rot) => {
    const bp = this.state.customBreakpoints;
    const prevBp = this.state.previousCustomBreakpoints;

    if (bp === prevBp && this.state.colorscaleType === 'custom') {
      return;
    }

    const cs = getColorscale(
      newColorscale,
      newColorscale.length,
      this.state.logBreakpoints,
      this.state.log,
      this.state.colorscaleType
    );

    let previousColorscale = newColorscale;
    if (this.state.colorscaleType === 'custom') {
      previousColorscale = this.state.previousColorscale;
    }

    if (!start && !rot) {
      this.setState({
        previousColorscale: previousColorscale,
        colorscale: cs,
        nSwatches: newColorscale.length,
        previousCustomBreakpoints:
          this.state.colorscaleType === 'custom'
            ? this.state.customBreakpoints
            : null,
      });
    } else {
      this.setState({
        previousColorscale: previousColorscale,
        colorscale: cs,
        nSwatches: newColorscale.length,
        previousCustomBreakpoints: null,
        cubehelix: {
          start: start,
          rotations: rot,
        },
      });
    }
    this.props.onChange(cs, this.state.colorscaleType);
  };

  updateSwatchNumber = ns => {
    const cs = getColorscale(
      this.state.previousColorscale,
      ns,
      this.state.logBreakpoints,
      this.state.log,
      this.state.colorscaleType
    );
    this.setState({
      nSwatches: ns,
      colorscale: cs,
      customBreakpoints: DEFAULT_BREAKPOINTS,
    });
    this.props.onChange(cs);
  };

  updateBreakpoints = e => {
    const bp = e.currentTarget.valueAsNumber;

    const cs = getColorscale(
      this.state.previousColorscale,
      this.state.nSwatches,
      bp,
      this.state.log,
      this.state.colorscaleType
    );

    this.setState({
      logBreakpoints: bp,
      colorscale: cs,
    });

    this.props.onChange(cs);
  };

  updateBreakpointArray = e => {
    const bpArr = e.currentTarget.value
      .replace(/,\s*$/, '')
      .split(',')
      .map(Number);
    this.setState({
      customBreakpoints: bpArr,
    });
  };

  updateCubehelixStart = start => {
    const rot = this.state.cubehelix.rotations;
    this.updateCubehelix(start, rot);
  };

  updateCubehelixRotations = rot => {
    const start = this.state.cubehelix.start;
    this.updateCubehelix(start, rot);
  };

  updateCubehelixStartState = start => {
    const ch = this.state.cubehelix;
    ch.start = start;
    this.setState({cubehelix: ch});
  };

  updateCubehelixRotState = rot => {
    const ch = this.state.cubehelix;
    ch.rotations = rot;
    this.setState({cubehelix: ch});
  };

  updateCubehelix = (start, rot) => {
    const newColorscale = chroma
      .cubehelix()
      .start(start)
      .rotations(this.state.cubehelix.rotations)
      // .gamma(DEFAULT_GAMMA)
      .lightness(DEFAULT_LIGHTNESS)
      .scale()
      .correctLightness()
      .colors(DEFAULT_NCOLORS);

    this.onClick(newColorscale, start, rot);
  };

  setColorscaleType(colorscale) {
    const value = colorscale.value;
    if (value !== this.state.colorscaleType) {
      let isLogColorscale = this.state.log;

      if (SCALES_WITHOUT_LOG.indexOf(value) >= 0) {
        isLogColorscale = false;
      }

      this.setState({
        colorscaleType: value,
        log: isLogColorscale,
      });
    }
  }

  render() {
    const colorscaleOptions = COLORSCALE_TYPES.map(c => ({
      label: c + ' scales',
      value: c,
    }));

    const colorscalePickerContainerClassnames =
      'colorscalePickerContainer' +
      (this.props.className ? ' ' + this.props.className : '');

    return (
      <div
        className={colorscalePickerContainerClassnames}
        style={{width: this.props.width || '250px'}}
      >
        {colorscaleOptions.map((option,i) => {
          return(<div className="colorscalePickerTopContainer" key={i}>
                {option.value}
                <FlipPaletteSelector
                  colorscaleType={
                    this.props.colorscaleType || option.value
                  }
                  colorscaleOnMount={this.state.colorscaleOnMount}
                  onClick={this.onClick}
                  previousColorscale={this.state.previousColorscale}
                  customBreakpoints={this.state.customBreakpoints}
                  nSwatches={this.state.nSwatches}
                  cubehelix={this.state.cubehelix}
                  updateCubehelixStartState={this.updateCubehelixStartState}
                  updateCubehelixStart={this.updateCubehelixStart}
                  handle={this.handle}
                  updateCubehelixRotState={this.updateCubehelixRotState}
                  updateCubehelixRotations={this.updateCubehelixRotations}
                  updateBreakpointArray={this.updateBreakpointArray}
                  scaleLength={this.props.scaleLength}
              />
          </div>) 
        })}
      </div>
    );
  }
}

FlipPicker.defaultProps = {
  initialColorscaleType: 'Sequential',
};

export class FlipPaletteSelector extends Component {
  render() {
    const {
      colorscaleType,
      onClick,
    } = this.props;
    return (
      <div className="colorscalePickerBottomContainer">
        <div style={{margin: '0 auto'}}>
          {BREWER.hasOwnProperty(colorscaleType) &&
            BREWER[colorscaleType].map((x, i) => {
              return <FlipPallets
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
}
