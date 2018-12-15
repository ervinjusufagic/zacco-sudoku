import React, { Component } from "react";
import "./Style.css";
class Cell extends Component {
  state = {
    num: 0
  };

  render() {
    return (
      <div className="cell">
        <button className="cellBtn">{this.props.number}</button>
      </div>
    );
  }
}
export { Cell };
