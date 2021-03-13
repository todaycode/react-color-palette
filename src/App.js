import React, { Component } from "react";

import FlipPalletsComponent from "./components/FlipPalletsComponent"
class App extends Component {
  render() {
    return (
      <div className="App" style={{"text-algin": "center"}}>
        <FlipPalletsComponent />
      </div>
    );
  }
}

export default App;