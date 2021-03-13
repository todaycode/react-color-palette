
import React, { Component } from "react";
import FlipPallets from "./FlipPallets/index";
import FlipPalletsPicker from "./FlipPalletsPicker";
import { DEFAULT_SCALE } from "./constants";
import "./css/ColorscalePicker.css";

class FlipPalletsComponent extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.toggleFlipPalletsPicker = this.toggleFlipPalletsPicker.bind(this);

    this.state = {
      showFlipPalletsPicker: false,
      colorscale: DEFAULT_SCALE,
    };
  }

  onChange = colorscale => {
    this.setState({
      colorscale: colorscale
    });
  };

  toggleFlipPalletsPicker = () => {
    this.setState({ showFlipPalletsPicker: !this.state.showFlipPalletsPicker });
  };

  render() {
    let toggleButtonStyle = {};
    if (this.state.showFlipPalletsPicker) {
      toggleButtonStyle = { borderColor: "#A2B1C6" };
    }
    return (
      <div className="flipcomponent">
        <div
          onClick={this.toggleFlipPalletsPicker}
          className="toggleButton"
          style={toggleButtonStyle}
        >
          <div className="palleteLabel">FlipPallets</div>
          <FlipPallets
            name="displaySwath"
            colorscale={this.state.colorscale}
            onClick={() => {}}
            width={250}
          />
        </div>
        {this.state.showFlipPalletsPicker && (
          <FlipPalletsPicker
            onChange={this.onChange}
            colorscale={this.state.colorscale}
            width={250}
          />
        )}
      </div>
    );
  }
}

export default FlipPalletsComponent;