import React, { Component } from "react";
import "./Style.css";
class Cell extends Component {
  state = {
    number: 0
  };

  render() {
    return (
      <div className="cell">
        <button>{this.props.number}</button>
      </div>
    );
  }
}
export { Cell };
