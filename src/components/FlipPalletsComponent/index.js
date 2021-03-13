
import React, { useState } from "react";
import { FlipPalettes } from "./FlipPalettes";
import { FlipPicker} from "./FlipPaletteSelector";
import { DEFAULT_SCALE } from "./constants";
import "./css/ColorscalePicker.css";

export const FlipPalletsComponent = props => {
  const [flipPalletsPickerState, setstate] = useState({showFlipPalletsPicker: false,colorscale: DEFAULT_SCALE,});
  const onChange = colorscale => {
    setstate({
      ...flipPalletsPickerState,
      colorscale: colorscale
    });
  };
  const toggleFlipPalletsPicker = () => {
    setstate({...flipPalletsPickerState,showFlipPalletsPicker: !flipPalletsPickerState.showFlipPalletsPicker });
  };
  let toggleButtonStyle = {};
  if (flipPalletsPickerState.showFlipPalletsPicker) {
    toggleButtonStyle = { borderColor: "#A2B1C6" };
  }
    return (
      <div className="flipcomponent">
        <div
          onClick={toggleFlipPalletsPicker}
          className="toggleButton"
          style={toggleButtonStyle}
        >
          <div className="palleteLabel">FlipPalette</div>
          <FlipPalettes
            name="displaySwath"
            colorscale={flipPalletsPickerState.colorscale}
            onClick={() => {}}
            width={250}
          />
        </div>
        {flipPalletsPickerState.showFlipPalletsPicker && (
          <FlipPicker
            onChange={onChange}
            colorscale={flipPalletsPickerState.colorscale}
            width={250}
          />
        )}
      </div>
    );
}