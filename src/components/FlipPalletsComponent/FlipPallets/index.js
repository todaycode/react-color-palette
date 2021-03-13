import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {DEFAULT_SCALE} from '../constants';

export default class FlipPallets extends Component {
  render() {
    const scale = this.props.colorscale ? this.props.colorscale : DEFAULT_SCALE;

    return (
      <div style={{width: '100%'}} className={this.props.name? "colorscale-container display-pos" :"colorscale-container"}>
        <div
          className="colorscale-palette-container"
          style={{
            display: 'inline-block',
            textAlign: 'start',
            width: this.props.label ? '75%' : '100%',
            height: this.props.name? '50px' : '20px',
            border: this.props.name? '3px solid' : '0px'
          }}
          ref = "myDiv"
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
              let selectedDiv = ReactDOM.findDOMNode(this.refs.myDiv);
              selectedDiv.classList.add("borderClass");
              return this.props.onClick(scale, this.props.start, this.props.rot)
            }}
          >
            {scale.map((x, i) => (
              <div
                key={i}
                className={this.props.name ? "colorscale-swatch display-swatch": "colorscale-swatch"}
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
}
