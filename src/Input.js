import React, { Component } from "react";
import "./Input.css";

class Input extends Component {
  onHandleClick = () => {
    let value = document.querySelector(".input").value;
    this.props.onSubmit(value);
  };
  render() {
    return (
      <div className="Input">
        <h1>Please Input a Movie</h1>
        <input className="input" type="password" />
        <button onClick={this.onHandleClick}>Submit</button>
      </div>
    );
  }
}

export default Input;
