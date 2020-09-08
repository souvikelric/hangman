import React, { Component } from "react";
import "./Input.css";

class GameRestart extends Component {
  render() {
    return (
      <div className="Input">
        <h1>{this.props.value}</h1>
        <a>Restart</a>
      </div>
    );
  }
}
export default GameRestart;
